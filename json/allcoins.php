<?php
// Needed for our class
include('./market_cap.php');

// Making a new object from all coin market cap data class
$mc = new all_coin_market_cap_data();

// Displaying this with some pretty_print
echo json_encode($mc->market_cap_data(590), JSON_PRETTY_PRINT);
?>
