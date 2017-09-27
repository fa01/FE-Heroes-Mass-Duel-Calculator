//heroHTML = "<option value=-1 class=\"hero_option\">Select Hero</option>";
for (i = 0; i < data.heroes.length; i++){
	//console.log(data.heroes[i].name);
	//console.log(i);
	//heroHTML += "<option value=" + i + " class=\"hero_option\">" + data.heroes[i].name + "</option>";
	var option = document.createElement("option");
	option.text = data.heroes[i].name;
	option.value = data.heroes[i].hero_id;
	var select = document.getElementById("attacker_name");
	select.appendChild(option);
}

function initAttacker(){
	var select = document.getElementById("attacker_name");
    var attackerID = select.options[select.selectedIndex].value;
    //var attackerText = select.options[select.selectedIndex].text;
	//console.log(attackerID);
	//console.log(attackerText);

	var element = document.getElementById("attacker_hp");
	element.innerHTML = data.heroes[attackerID-1].basehp;

	element = document.getElementById("attacker_atk");
	element.innerHTML = data.heroes[attackerID-1].baseatk;

	element = document.getElementById("attacker_spd");
	element.innerHTML = data.heroes[attackerID-1].basespd;

	element = document.getElementById("attacker_def");
	element.innerHTML = data.heroes[attackerID-1].basedef;

	element = document.getElementById("attacker_res");
	element.innerHTML = data.heroes[attackerID-1].baseres;
}

initAttacker();

for (i = 0; i < data.heroes.length; i++){
	//console.log(data.heroes[i].name);
	//console.log(i);
	var option2 = document.createElement("option");
	option2.text = data.heroes[i].name;
	option2.value = data.heroes[i].hero_id;
	var select2 = document.getElementById("defender_name");
	select2.appendChild(option);
}

function initDefender(){
	var select = document.getElementById("defender_name");
    var defenderID = select.options[select.selectedIndex].value;
    var defenderText = select.options[select.selectedIndex].text;
	console.log(defenderID);
	console.log(defenderText);

	var element2 = document.getElementById("defender_hp");
	element2.innerHTML = data.heroes[defenderID-1].basehp;

	element2 = document.getElementById("defender_atk");
	element2.innerHTML = data.heroes[defenderID-1].baseatk;

	element2 = document.getElementById("defender_spd");
	element2.innerHTML = data.heroes[defenderID-1].basespd;

	element2 = document.getElementById("defender_def");
	element2.innerHTML = data.heroes[defenderID-1].basedef;

	element2 = document.getElementById("defender_res");
	element2.innerHTML = data.heroes[defenderID-1].baseres;
}

initDefender();

