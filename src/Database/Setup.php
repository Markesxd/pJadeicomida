<?php 
    namespace Rafael\PJadeicomida\Database;

    class Setup
    {

        public function handle(): string
        {
            $sql = "CREATE TABLE IF NOT EXISTS migrations (
                number INT
            )";
            $db = new Connection();
        
            $db->query($sql);
            $n = $db->find('migrations');
            if($n === false) {
                $sql = "INSERT INTO migrations (number) values (0)";
                $db->query($sql); 
                $n = 0;
            } else {
                $n = $n['number'];
            }
            $path = __DIR__ . '/migrations'; 
            $files = preg_grep('/^([^.])/',scandir($path));
            foreach($files as $i => $file) {
                if($i - 1 > $n) {
                    $sql = file_get_contents("$path/$file");
                    $db->query($sql);
                }
            }
            $i = count($files);
            $sql = "UPDATE migrations SET number=$i";
            $db->query($sql);
            return '<h1>Setup Complete</h1>';
        }
    }
