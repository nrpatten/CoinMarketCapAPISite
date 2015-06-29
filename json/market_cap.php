<?php
include('simple_html_dom.php');

class all_coin_market_cap_data {
    public $coin_market_cap_url = 'http://coinmarketcap.com/';
    
    public $number_cleanup_regex = "/[^-e\.0-9]+/";

    public function market_cap_data ($top = 650) {
        // This is the source of our data below
        $html = file_get_html($this->coin_market_cap_url . 'all/views/all/');

        // This variable is where we will store all of the coins.
        $list_of_coins = array();

        for ($i = 1; $i <= $top; $i++) {
            // We are parsing the table rows from 1 to 100
            // Here we get the $i'th "tr" element in the table
            $step = $html->find('tr', $i);

            // We get the properties of the table row for this coin in plaintext
            $position = $step->find('td', 0)->plaintext;
            $logo = $step->find('img.currency-logo', 0)->src;
            $name = $step->find('a', 0)->plaintext;
            $symbol = $step->find('td', 2)->plaintext;
            $marketcap = $step->find('td', 3)->plaintext;
            $price = $step->find('a', 1)->plaintext;
            $supply = $step->find('td', 5)->plaintext;
            $volume = $step->find('td', 6)->plaintext;
            $change1h = $step->find('td', 7)->plaintext;
            $change24h = $step->find('td', 8)->plaintext;
            $change1d = $step->find('td', 9)->plaintext;

            // We build an array data structure using the parsed table row
            $arr = array(
                'position' => $position,
                'logo' => $logo,
                'name' => $name,
                'symbol' => $symbol,
                'marketcap_usd' => $marketcap,
                'price_usd' => $price,
                'supply_btc' => $supply,
                'volume_usd' => $volume,
                'change1h' => $change1h,
                'change24h' => $change24h,
                'change1d' => $change1d,
                
            );

            // We are cleaning the data, we only want decimal numbers
            foreach ($arr as $key => $value) {
                // We don't want to wipe out the name
                if ($key != 'name' && $key != 'logo' && $key != 'symbol') {
                    // Remove everything that isn't a number or period
                    $arr[$key] = (double) preg_replace($this->number_cleanup_regex, "", $value);
                }
            }
 
            $arr['logo'] = preg_replace("/\\/static\\/img\\/coins\\/16x16\\//", "", $logo);           

            $arr['price_usd_expanded'] = number_format($arr['price_usd'], 9, '.', '');

            // We push this data structure onto a list of coins array
            array_push($list_of_coins, $arr);
        }

        // This represents the root JSON object
        $json_root = array(
            'timestamp' => gmdate("d-m-Y H:i:s"),
            'markets' => $list_of_coins
        );
        
        return $json_root;
    }
}

?>
