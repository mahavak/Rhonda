<?php
require_once 'config.php';

// Get request method and endpoint
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'] ?? '', '/'));
$endpoint = $request[0] ?? '';

// For demo purposes - in production, implement proper authentication
$user_id = 1; // Default user

switch ($endpoint) {
    case 'track-supplement':
        if ($method === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);
            
            $stmt = $pdo->prepare("INSERT INTO supplement_tracking (user_id, supplement_id, taken, notes, tracked_date) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([
                $user_id,
                $data['supplement_id'],
                $data['taken'] ? 1 : 0,
                $data['notes'] ?? '',
                $data['date'] ?? date('Y-m-d')
            ]);
            
            echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
        }
        break;
        
    case 'track-sauna':
        if ($method === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);
            
            $stmt = $pdo->prepare("INSERT INTO sauna_sessions (user_id, duration, temperature, notes, session_date) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([
                $user_id,
                $data['duration'],
                $data['temperature'],
                $data['notes'] ?? '',
                $data['date'] ?? date('Y-m-d')
            ]);
            
            echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
        }
        break;
        
    case 'stats':
        if ($method === 'GET') {
            // Get 30-day stats
            $thirty_days_ago = date('Y-m-d', strtotime('-30 days'));
            
            // Supplement count
            $stmt = $pdo->prepare("SELECT COUNT(*) as count FROM supplement_tracking WHERE user_id = ? AND tracked_date >= ?");
            $stmt->execute([$user_id, $thirty_days_ago]);
            $supplements = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
            
            // Sauna count
            $stmt = $pdo->prepare("SELECT COUNT(*) as count, AVG(duration) as avg_duration FROM sauna_sessions WHERE user_id = ? AND session_date >= ?");
            $stmt->execute([$user_id, $thirty_days_ago]);
            $sauna = $stmt->fetch(PDO::FETCH_ASSOC);
            
            echo json_encode([
                'supplements_tracked_30_days' => $supplements,
                'sauna_sessions_30_days' => $sauna['count'],
                'average_sauna_duration' => round($sauna['avg_duration'] ?? 0)
            ]);
        }
        break;
        
    case 'export':
        if ($method === 'GET') {
            // Export user data
            $stmt = $pdo->prepare("SELECT * FROM supplement_tracking WHERE user_id = ? ORDER BY tracked_date DESC");
            $stmt->execute([$user_id]);
            $supplements = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            $stmt = $pdo->prepare("SELECT * FROM sauna_sessions WHERE user_id = ? ORDER BY session_date DESC");
            $stmt->execute([$user_id]);
            $sauna = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode([
                'supplements' => $supplements,
                'sauna_sessions' => $sauna,
                'exported_at' => date('Y-m-d H:i:s')
            ]);
        }
        break;
        
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
}
?>