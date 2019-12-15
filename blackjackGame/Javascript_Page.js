	document.writeln('<link rel="stylesheet" type="text/css" href = "Styling_of_Game.css"></script>');
	var names = ["1","2","3","4","5","6","7","8","9","10","J","K","Q"];
	var value = ["1","2","3","4","5","6","7","8","9","10","10","10","10"];
	var suit = ["Diamonds","Hearts","Clubs","Spades"];
	var deck = [];
	var player = [];
	var id = 0;
	var dealer_card1, dealer_card2;
	var name_of_split_card;
	var res=0;
	var d_total = 0,t=0;
	var Money = 100;
	var ii=0,n=0;
	var jj=0;
	var valu = localStorage.getItem("v");
	var valuee = JSON.parse(valu);
	var valueee = localStorage.getItem("b");
	var bet = JSON.parse(valueee);
  
	function card(Name, Value, Suit) {
		this.Name = Name;
		this.Value = Value;
		this.Suit = Suit;
	}
  
	function deck_of_cards() {
		for(var k=0 ; k<suit.length ; k++) {
			for(var tt=0 ; tt<value.length ; tt++) {
				var oneCard = new card(names[tt], value[tt], suit[k]);
				deck.push(oneCard);
			}
		}
	}
  
	function shuffle() {
		for(var k=0 ; k<100 ; k++){
			var loc1 = Math.floor(Math.random()*52);
			var loc2 = Math.floor(Math.random()*52);
			var tmp = deck[loc1];
			deck[loc1] = deck[loc2];
			deck[loc2] = tmp;
		}	
	}	
	
	function player_fun(Name, Id, Bet, Money_left, p_total) {
		this.Name = Name;
		this.Id = Id;
		this.Bet = Bet;
		this.Money_left = Money_left;
		this.p_total = Number(p_total);
		this.Card = [];
	}
	
	function players_info() {
		for(var k=0;k<valuee.length;k++){
			var one_player = [new player_fun(valuee[k], k, Number(bet[k]), Money-Number(bet[k]), 0)];
			player.push(one_player);
		}
	}
	
	function distribute_cards() {
		for(var k=0;k<player.length;k++){
			for(var t=1;t<=2;t++){
				ii = k;
				draw_card_for_player(k,0);
			}
		}
		for(var k=0;k<2;k++)
			draw_card_for_dealer(k);
	}
	
	function initialise(){
		document.getElementById("d_total").innerHTML = 0;
		document.getElementById("d_bet").innerHTML = "None";
		for(var k=0;k<valuee.length;k++){
			document.getElementById("p"+k+"_name").innerHTML = "Player Name: "+valuee[k];
			document.getElementById("p"+k+"_money").innerHTML = "Money left: "+player[k][0].Money_left;
			document.getElementById("p"+k+"_total").innerHTML = "player Total: "+0;
			document.getElementById("p"+k+"_bet").innerHTML = "Player Bet: "+bet[k];
			document.getElementById("p"+k+"_split").innerHTML = "No. Splits of Player"+k+": "+0;
		}
	}
	
	function startGame() {
		deck_of_cards();
		shuffle();
		players_info();
		initialise();
		distribute_cards();
		card_dis(0,-1);
	}
	function dd(){
		while(d_total < 17) {
			draw_card_for_dealer(2);
		}
		for(var i=0;i<player.length;i++){
			for(var j=0;j<player[i].length;j++)
				check_total_of_dealer(i,j);
		}
	}
	function card_dis(i,j) {
		disable_buttons();
		j++;
		if(j>=player[i].length){
			j=0;
			i++;
			t=0;
			n=0;
		}
		ii=i;
		jj=j;
		if(i==player.length)
			dd();
		document.getElementById("d_bet").innerHTML = "Chance of player "+player[ii][jj].Name+" "+" part"+n+"<br> ";
		document.getElementById("p"+ii+"_total").innerHTML = "Player Total: "+player[ii][jj].p_total;
		n++;
	    if(player[i][j].p_total == 21){
			res=1;
			check_total_of_player();
		}
		else
			check_split();
		enable_buttons();
	}
	
	function draw_card_for_player(p,q) {	
		if(deck[id].Value==11 && player[p][q].p_total+11>21)
			var x = Number(1);
		else
			var x = Number(deck[id].Value);
		player[p][q].p_total += x;
		(player[p][q].Card).push(deck[id].Name);
		document.getElementById("p"+p+"_total").innerHTML = "Player Total: "+player[ii][jj].p_total;
		print_card(p,q,0);
		id++;	
		if(id==52){
			shuffle();
			id=0;
		}
	}
	
	function print_card(p,q,h){
		if(h==0){
			var myNode = document.getElementById("p"+p+"_card"+q);
			while (myNode.firstChild) {
				myNode.removeChild(myNode.firstChild);
			}
			for(var i=0;i<player[p][q].Card.length;i++){
				var newElement1 = document.createElement('div');
				newElement1.className = "card "+deck[id].Suit;
				newElement1.innerHTML = player[p][q].Card[i];
				document.getElementById("p"+p+"_card"+q).appendChild(newElement1);
			}
		}
		if(h==1){
			var newElement1 = document.createElement('div');
				newElement1.className = "card "+deck[id].Suit;
				newElement1.innerHTML = deck[id].Name;
			document.getElementById("dealerMid").appendChild(newElement1);
		}
	}
	
	function addElement(t){
		var newElement1 = document.createElement('div');
		var x = 'p'+ii+'_card'+t;
		newElement1.id = x;
		newElement1.className = 'mid1';
		var y = "mid"+ii;
		document.getElementById(y).appendChild(newElement1);
	}
	
	function split() {
		var c = new player_fun(player[ii][jj].Name, player[ii][jj].Id, player[ii][jj].Bet/2, player[ii][jj].Money_left, Number(l));
		player[ii].push(c);
		t++;
		console.log(t);
		document.getElementById("split").disabled = true;
		player[ii][jj].Bet = player[ii][player[ii].length-1].Bet;
		player[ii][jj].p_total = Number(player[ii][jj].p_total)-Number(l);
		var x = player[ii][jj].Card[player[ii][jj].Card.length-1];
		player[ii][player[ii].length-1].Card.push(x);
		player[ii][jj].Card.pop();
		document.getElementById("p"+ii+"_bet").innerHTML = "Player Bet: "+player[ii][jj].Bet;
		var m  = player[ii].length-1;
		document.getElementById("p"+ii+"_split").innerHTML = "No. of Splits of Player"+ii+": 0-"+m;
		addElement(t);
		for(var k=0;k<2;k++){
			draw_card_for_player(ii,jj);
		}
		l = Number(deck[id-1].Value);
		for(var k=0;k<2;k++){
			draw_card_for_player(ii,player[ii].length-1);
		}
		if(player[ii][jj].p_total > 21 || player[ii][jj].p_total == 21)
			check_total_of_player();
		else
			check_split();
	}
	
	function check_split() {
		if(player[ii][jj].Card[player[ii][jj].Card.length-1] == player[ii][jj].Card[player[ii][jj].Card.length-2]){
			document.getElementById("split").disabled = false;
			var c = player[ii][jj].Card[player[ii][jj].Card.length-1];
			if(c == "J" || c == "Q" || c == "K")
				l=10;
			else if(c == "A"){ 
				if(player[ii][jj].p_total+11>21)
					l=1;
				else
					l = 11;
			}
			else 
				l = Number(player[ii][jj].Card[player[ii][jj].Card.length-1]);
		}
	}
	
	function check_total_of_player() {
		if(res==1){
			var money = player[ii][ij].Bet*(3/2)+player[ii][jj].Bet;
			player[ii][jj].Money += money;
			var msg = "BLACKJACK. You Won";
			show_result(money, msg);
			res=0;
			player[ii].splice(jj,1);
			card_dis(ii,jj-1);
		}
		else if(player[ii][jj].p_total == 21) {
			var money = player[ii][jj].Bet*(3/2);
			player[ii][jj].Money += money;
			var msg = "You Won";
			show_result(money, msg);
			player[ii].splice(jj,1);
			card_dis(ii,jj-1);
		}	
		else if(player[ii][jj].p_total > 21) {
			var money = 0;
			var msg = "You Loss";
			show_result(money, msg);
			player[ii].splice(jj,1);
			card_dis(ii,jj-1);
		}
	}
	
	function hit() {
		document.getElementById("split").disabled = true;
		draw_card_for_player(ii,jj);
		check_total_of_player();
	}
	
	function stand() {
		document.getElementById("split").disabled = true;
		card_dis(ii,jj);
	}
	
	function doublee() {
		document.getElementById("split").disabled = true;
		player[ii][jj].Money_left = player[ii][jj].Money_left - player[ii][jj].Bet;
		document.getElementById("p"+ii+"_money").innerHTML = "Money left: "+player[ii][jj].Money_left;
		player[ii][jj].Bet += player[ii][jj].Bet;
		document.getElementById("p"+ii+"_bet").innerHTML = "Player Bet: "+player[ii][jj].Bet;
		draw_card_for_player(ii,jj);
		check_total_of_player();
		card_dis(ii,jj);
	}
	
	function check_total_of_dealer(p,q) {
		if(d_total == 21 || (d_total < 21 && player[p][q].p_total < d_total)) {
			var msg = "Dealer Wins. You loses by ";
			var money = player[p][q].Bet;
			player[p][q].Money -= player[p][q].Bet;
		}	
		else if(d_total < 21 && player[p][q].p_total == d_total) {
			var money = 0;
			var msg = "No one Wins. Its a tie.You loses ";
		}
		else if(d_total > 21 || (d_total < 21 && player[p][q].p_total > d_total)) {
			var money = player[p][q].Bet*(3/2);
			player[p][q].Money += money;
			var msg = "You Won ";
		}
		show_result_dealer(money, msg,p,q);
	}
	
	function draw_card_for_dealer(c) {
		if(deck[id].Value==11 && p_total+11>21)
			var x = Number(1);
		else
			var x = Number(deck[id].Value);
		d_total += x;
		document.getElementById("d_total").innerHTML = "Dealer Total: "+d_total;
		print_card(0,0,1);
		id++;
		if(c<2){
			dealer_card1 = deck[id].Name;
			dealer_card2 = deck[id].Name;
		}
		if(id==52){
			shuffle();
			id=0;
		}
	}
	
	function enable_buttons() {
		document.getElementById("hit").disabled = false;
		document.getElementById("stand").disabled = false;
		document.getElementById("double").disabled = false;
		document.getElementById("startgame").disabled = true;
	}
	
	function disable_buttons() {
		document.getElementById("hit").disabled = true;
		document.getElementById("stand").disabled = true;
		document.getElementById("double").disabled = true;
		document.getElementById("startgame").disabled = true;
	}
	
	function show_result(money, str) {
		var m = money+player[ii][jj].Money_left;
		document.getElementById("p"+ii+"_card"+jj).innerHTML += str+" "+" and and got Rs. "+money+" Now you have total Rs. = "+m;
		document.getElementById("p"+ii+"_bet").innerHTML = "Player Bet: "+0;
		document.getElementById("p"+ii+"_money").innerHTML = "Money left: "+m;
	}
	
	function show_result_dealer(money, str,i,j) {
		var m = money+player[ii][jj].Money_left;
		document.getElementById("p"+i+"_card"+j).innerHTML += str+" "+" and got Rs. "+money+" Now you have total Rs. = "+m;
		document.getElementById("p"+ii+"_bet").innerHTML = "Player Bet: "+0;
		document.getElementById("p"+ii+"_money").innerHTML = "Money left: "+m;
	}