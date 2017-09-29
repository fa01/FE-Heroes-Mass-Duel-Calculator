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
	getHeroAssets(attackerID, 0);
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
	//console.log(defenderID);
	//console.log(defenderText);
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
	getHeroAssets(defenderID, 1);
	
}

initDefender();

function getAttackerIcon(id_num){
    //console.log(id_num);
	var getAttackerPicture = document.getElementById("attacker_picture");
	getAttackerPicture.src = "heroes/" + data.heroes[id_num-1].name + ".png";
}

function getDefenderIcon(id_num){
	//console.log(id_num);
	var getDefenderPicture = document.getElementById("defender_picture");
	getDefenderPicture.src = "heroes/" + data.heroes[id_num-1].name + ".png";
}


function getHeroAssets(id_num, attackerOrDefender){
	if (attackerOrDefender == 0){
		var weaponSelect = document.getElementById("attacker_weapon");
		var passiveAoption = document.getElementById("attacker_a");
		var passiveBoption = document.getElementById("attacker_b");
		var passiveCoption = document.getElementById("attacker_c");
		var specialSelect = document.getElementById("attacker_special");
		var assistOption = document.getElementById("attacker_assist");
		var passiveAPicture = document.getElementById("attacker_a_picture");
		var passiveBPicture = document.getElementById("attacker_b_picture");
		var passiveCPicture = document.getElementById("attacker_c_picture");
	}
	else{
		var weaponSelect = document.getElementById("defender_weapon");
		var passiveAoption = document.getElementById("defender_a");
		var passiveBoption = document.getElementById("defender_b");
		var passiveCoption = document.getElementById("defender_c");
		var specialSelect = document.getElementById("defender_special");
		var assistOption = document.getElementById("defender_assist");
		var passiveAPicture = document.getElementById("defender_a_picture");
		var passiveBPicture = document.getElementById("defender_b_picture");
		var passiveCPicture = document.getElementById("defender_c_picture");
	}
	removeOptions(weaponSelect);
	removeOptions(passiveAoption);
	removeOptions(passiveBoption);
	removeOptions(passiveCoption);
	removeOptions(specialSelect);
	removeOptions(assistOption);
	//console.log(passiveAPicture);
	passiveAPicture.src = "skills/noskill.png";
	passiveBPicture.src = "skills/noskill.png";
	passiveCPicture.src = "skills/noskill.png";

	var possibleAttributes = new Object();
	var thing = new Array();
	for (i = 0; i < data.heroSkills.length; i++){
		if (data.heroSkills[i].hero_id == id_num){
			thing[i] = data.heroSkills[i].skill_id;
		}
	}

	for (i = 0; i < data.skills.length; i++){
		for (j = 0; j < thing.length; j++){
			if (data.skills[i].skill_id == thing[j]){
				if (data.skills[i].slot == "weapon"){
					var weaponOption = document.createElement("option");
					weaponOption.text = data.skills[i].name;
					weaponOption.value = thing[j];
					weaponSelect.appendChild(weaponOption);
					//console.log(weaponOption);
				}
				if (data.skills[i].slot == "a"){
					var passiveA = document.createElement("option");
					passiveA.text = data.skills[i].name;
					//console.log(passiveA.text);
					passiveA.value = thing[i];
					passiveAoption.appendChild(passiveA);
					var skillName = data.skills[i].name;
					var skillNamePath = skillName.split(" ").join("_");
					//passiveAPicture.src = "skills/" + skillNamePath + ".png";
					updateAPicture(id_num, attackerOrDefender, skillNamePath);
				}

				if (data.skills[i].slot == "b"){
					var passiveB = document.createElement("option");
					passiveB.text = data.skills[i].name;
					passiveB.value = thing[i];
					passiveBoption.appendChild(passiveB);
					var skillName = data.skills[i].name;
					var skillNamePath = skillName.split(" ").join("_");
					//passiveBPicture.src = "skills/" + skillNamePath + ".png";
					//console.log(attackerOrDefender);
					updateBPicture(id_num, attackerOrDefender, skillNamePath);
				}

				if (data.skills[i].slot == "c"){
					var passiveC = document.createElement("option");
					passiveC.text = data.skills[i].name;
					passiveC.value = thing[i];
					passiveCoption.appendChild(passiveC);
					var skillName = data.skills[i].name;
					var skillNamePath = skillName.split(" ").join("_");
					//passiveCPicture.src = "skills/" + skillNamePath + ".png";
					updateCPicture(id_num, attackerOrDefender, skillNamePath);
				}

				if (data.skills[i].slot == "special"){
					var specialOption = document.createElement("option");
					specialOption.text = data.skills[i].name;
					specialOption.value = thing[i];
					specialSelect.appendChild(specialOption);
				}
				if (data.skills[i].slot == "assist"){
					var assistSkill = document.createElement("option");
					assistSkill.text = data.skills[i].name;
					assistSkill.value = thing[i];
					assistOption.appendChild(assistSkill);
				}
			}
		}
	}
}

function updateAPicture(id_number, aORd, assestName){
	if (aORd == 0){
		var passiveAPicture = document.getElementById("attacker_a_picture");
	}
	else{
		var passiveAPicture = document.getElementById("defender_a_picture");
	}

	passiveAPicture.src = "skills/" + assestName + ".png";
}

function updateBPicture(id_number, aORd, assestName){
	if (aORd == 0){
		var passiveBPicture = document.getElementById("attacker_b_picture");
	}
	else{
		var passiveBPicture = document.getElementById("defender_b_picture");
	}

	passiveBPicture.src = "skills/" + assestName + ".png";
}

function updateCPicture(id_number, aORd, assestName){
	if (aORd == 0){
		var passiveCPicture = document.getElementById("attacker_c_picture");
	}
	else{
		var passiveCPicture = document.getElementById("defender_c_picture");
	}

	passiveCPicture.src = "skills/" + assestName + ".png";
}
function removeOptions(selectbox)
{
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
    	//console.log(selectbox[i]);
        selectbox.remove(i);
    }
}
