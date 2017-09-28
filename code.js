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
	//console.log(select);
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

	getAttackerIcon(attackerID);
	getHeroWeapon(attackerID);
}

initAttacker();

for (i = 0; i < data.heroes.length; i++){
	//console.log(data.heroes[i].name);
	//console.log(i);
	var newDefender = document.createElement("option");
	newDefender.text = data.heroes[i].name;
	newDefender.value = data.heroes[i].hero_id;
	var addDefender = document.getElementById("defender_name");
	addDefender.appendChild(newDefender);
	//console.log(select2);
}

function initDefender(){
	var getDefender = document.getElementById("defender_name");
    var defenderID = getDefender.options[getDefender.selectedIndex].value;
    var defenderText = getDefender.options[getDefender.selectedIndex].text;
	console.log(defenderID);
	console.log(defenderText);
	//console.log(data.heroes[defenderID-3]);

	var defenderStat = document.getElementById("defender_hp");
	defenderStat.innerHTML = data.heroes[defenderID-1].basehp;

	element2 = document.getElementById("defender_atk");
	element2.innerHTML = data.heroes[defenderID-1].baseatk;

	element2 = document.getElementById("defender_spd");
	element2.innerHTML = data.heroes[defenderID-1].basespd;

	element2 = document.getElementById("defender_def");
	element2.innerHTML = data.heroes[defenderID-1].basedef;

	element2 = document.getElementById("defender_res");
	element2.innerHTML = data.heroes[defenderID-1].baseres;

	getDefenderIcon(defenderID);
	
}

initDefender();

function getAttackerIcon(id_num){
    //console.log(id_num);
	var getAttackerPicture = document.getElementById("attacker_picture");
	getAttackerPicture.src = "heroes/" + data.heroes[id_num-1].name + ".png";
}

function getDefenderIcon(id_num){
	console.log(id_num);
	var getDefenderPicture = document.getElementById("defender_picture");
	getDefenderPicture.src = "heroes/" + data.heroes[id_num-1].name + ".png";
}

function getHeroWeapon(id_num){
	var possibleAttributes = new Object();
	var thing = new Array();
	for (i = 0; i < data.heroSkills.length; i++){
		if (data.heroSkills[i].hero_id == id_num){
			thing[i] = data.heroSkills[i].skill_id;
		}
	}

	var weaponSelect = document.getElementById("attacker_weapon");

	for (i = 0; i < data.skills.length; i++){
		for (j = 0; j < thing.length; j++){
			if (data.skills[i].skill_id == thing[j]){
				var weaponOption = document.createElement("option");
				weaponOption.text = data.skills[i].name;
				weaponOption.value = thing[j];
				weaponSelect.appendChild(weaponOption);
				console.log(weaponOption);
			}
		}
	}

}


