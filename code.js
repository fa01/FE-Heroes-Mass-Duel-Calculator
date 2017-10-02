//Banes/Boons of +/- 4 are because of Growth Shifts of 3
//Credit for Growth Table: from https://feheroes.wiki/Stat_Growth
data.growths = [[6,8,9,11,13,14,16,18,19,21,23,24],
[7,8,10,12,14,15,17,19,21,23,25,26],
[7,9,11,13,15,17,19,21,23,25,27,29],
[8,10,12,14,16,18,20,22,24,26,28,31],
[8,10,13,15,17,19,22,24,26,28,30,33]];

//Sort hero array by name
data.heroes.sort(function(a,b){
	//console.log(a.name + ", " + b.name + ": " + a.name>b.name);
	return (a.name.toLowerCase() > b.name.toLowerCase())*2-1;
})

//Sort skills array by name
data.skills.sort(function(a,b){
	//console.log(a.name + ", " + b.name + ": " + a.name>b.name);
	return (a.name.toLowerCase() + a.slot > b.name.toLowerCase() + b.slot)*2-1;
})

attacker = {};
attacker.name = "";
attacker.rarity = 0;
attacker.hp = 0;
attacker.atk = 0;
attacker.spd = 0;
attacker.def = 0;
attacker.res = 0;
attacker.weaponName = "";
attacker.weaponHp = 0;
attacker.weaponAtk = 0;
attacker.weaponSpd = 0;
attacker.weaponDef = 0;
attacker.weaponRes = 0;
attacker.weaponID = 0;


defender = {};
defender.name = "";
defender.rarity = 0
defender.hp = 0;
defender.atk = 0;
defender.spd = 0;
defender.def = 0;
defender.res = 0;
defender.weaponName = "";
defender.weaponAtk = 0;
defender.weaponAtk = 0;
defender.weaponSpd = 0;
defender.weaponDef = 0;
defender.weaponRes = 0;
defender.weaponID = 0;
defender.hpLeft = 0;

for (i = 0; i < data.heroes.length; i++){
	var option = document.createElement("option");
	option.text = data.heroes[i].name;
	option.value = data.heroes[i].hero_id;
	var select = document.getElementById("attacker_name");
	select.appendChild(option);
}

function initAttacker(){

	var select = document.getElementById("attacker_name");
    var attackerID = select.options[select.selectedIndex].value;
    attacker.name = select.options[select.selectedIndex].text;
    var attackerRarity = document.getElementById("attacker_rarity").value;
    attacker.rarity = attackerRarity;
    var weapon = document.getElementById("attacker_weapon");
    //console.log(weapon);

	for (i = 0; i < data.heroes.length; i++){
		if (data.heroes[i].hero_id == attackerID){

			attacker.hp = data.heroes[i].basehp +  data.growths[attackerRarity - 1][data.heroes[i].hpgrowth];
			attacker.atk = data.heroes[i].baseatk +  data.growths[attackerRarity - 1][data.heroes[i].atkgrowth];
			attacker.spd = data.heroes[i].basespd +  data.growths[attackerRarity - 1][data.heroes[i].spdgrowth];
			attacker.def = data.heroes[i].basedef +  data.growths[attackerRarity - 1][data.heroes[i].defgrowth];
			attacker.res = data.heroes[i].baseres +  data.growths[attackerRarity - 1][data.heroes[i].resgrowth];

			getAttackerIcon(i);
		}
	}
	getHeroAssets(attackerID, 0);
	updateWithWeapon(0);
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
    defender.name = select.options[select.selectedIndex].text;
    var defenderRarity = document.getElementById("defender_rarity").value;
    defender.rarity = defenderRarity;

    for (i = 0; i < data.heroes.length; i++){
		if (data.heroes[i].hero_id == defenderID){
			defender.hp = data.heroes[i].basehp +  data.growths[defender.rarity - 1][data.heroes[i].hpgrowth];
			defender.atk = data.heroes[i].baseatk +  data.growths[defender.rarity - 1][data.heroes[i].atkgrowth];
			defender.spd = data.heroes[i].basespd +  data.growths[defender.rarity - 1][data.heroes[i].spdgrowth];
			defender.def = data.heroes[i].basedef +  data.growths[defender.rarity - 1][data.heroes[i].defgrowth];
			defender.res = data.heroes[i].baseres +  data.growths[defender.rarity - 1][data.heroes[i].resgrowth];

			getDefenderIcon(i);
		}
	}

	getHeroAssets(defenderID, 1);
	updateWithWeapon(1);
	
}

initDefender();

function getAttackerIcon(id_num){
	var getAttackerPicture = document.getElementById("attacker_picture");
	getAttackerPicture.src = "heroes/" + data.heroes[id_num].name + ".png";
}

function getDefenderIcon(id_num){
	var getDefenderPicture = document.getElementById("defender_picture");
	getDefenderPicture.src = "heroes/" + data.heroes[id_num].name + ".png";
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
					passiveA.value = thing[j];
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

	//  ------------------ CHANGE ATTACKER ASSETS TO LAST ONE IN LIST ----------------------
	if (attackerOrDefender == 0){
		var getLastWeapon = document.getElementById("attacker_weapon");

		sortSelect(getLastWeapon);
		getLastWeapon.selectedIndex = getLastWeapon.length-1;
		var weaponValue = getLastWeapon[getLastWeapon.selectedIndex];
		attacker.weaponID = weaponValue.value;
		attacker.weaponName = weaponValue.text;
		//console.log(attacker.weaponName);
		//console.log(attacker.weaponID);

		var getLastAPassive = document.getElementById("attacker_a");
		getLastAPassive.selectedIndex = getLastAPassive.length-1;

		var getLastBPassive = document.getElementById("attacker_b");
		getLastBPassive.selectedIndex = getLastBPassive.length-1;

		var getLastCPassive = document.getElementById("attacker_c");
		getLastCPassive.selectedIndex = getLastCPassive.length-1;

		var getLastSpecial = document.getElementById("attacker_special");
		getLastSpecial.selectedIndex = getLastSpecial.length-1;
	}

	//  ------------------ CHANGE DEFENDER ASSETS TO LAST ONE IN LIST ----------------------
	else{
		//getLastWeapon = document.getElementById("defender_weapon");
		//getLastWeapon.selectedIndex = getLastWeapon.length-1;
		var getLastWeapon = document.getElementById("defender_weapon");
		sortSelect(getLastWeapon);
		getLastWeapon.selectedIndex = getLastWeapon.length-1;
		weaponValue = getLastWeapon[getLastWeapon.selectedIndex];
		defender.weaponID = weaponValue.value;
		defender.weaponName = weaponValue.text;
		//console.log(defender.weaponID);

		getLastAPassive = document.getElementById("defender_a");
		getLastAPassive.selectedIndex = getLastAPassive.length-1;

		getLastBPassive = document.getElementById("defender_b");
		getLastBPassive.selectedIndex = getLastBPassive.length-1;

		getLastCPassive = document.getElementById("defender_c");
		getLastCPassive.selectedIndex = getLastCPassive.length-1;

		getLastSpecial = document.getElementById("defender_special");
		getLastSpecial.selectedIndex = getLastSpecial.length-1;
	}
}

function updateWithWeapon(aORd){
	if (aORd == 0){
		for (i = 0; i < data.skills.length; i++){
			if (data.skills[i].skill_id == attacker.weaponID){
				attacker.weaponHp = data.skills[i].hp;
				attacker.weaponAtk = data.skills[i].atk;
				attacker.weaponSpd = data.skills[i].spd;
				attacker.weaponDef = data.skills[i].def;
				attacker.weaponRes = data.skills[i].res;

				attacker.hp += attacker.weaponHp;
				attacker.atk += attacker.weaponAtk;
				attacker.spd += attacker.weaponSpd;
				attacker.def += attacker.weaponDef;
				attacker.res += attacker.weaponRes;

				var element = document.getElementById("attacker_hp");
				element.innerHTML = attacker.hp;

				element = document.getElementById("attacker_atk");
				element.innerHTML = attacker.atk;

				element = document.getElementById("attacker_spd");
				element.innerHTML = attacker.spd;

				element = document.getElementById("attacker_def");
				element.innerHTML = attacker.def;

				element = document.getElementById("attacker_res");
				element.innerHTML = attacker.res;
			}
		}
	}
	else {
		for (i = 0; i < data.skills.length; i++){
			if (data.skills[i].skill_id == defender.weaponID){
				defender.weaponHp = data.skills[i].hp;
				defender.weaponAtk = data.skills[i].atk;
				console.log(defender.weaponAtk);
				defender.weaponSpd = data.skills[i].spd;
				defender.weaponDef = data.skills[i].def;
				defender.weaponRes = data.skills[i].res;

				defender.hp += defender.weaponHp;
				defender.atk += defender.weaponAtk;
				console.log(defender.atk);
				defender.spd += defender.weaponSpd;
				defender.def += defender.weaponDef;
				defender.res += defender.weaponRes;

				var element = document.getElementById("defender_hp");
				element.innerHTML = defender.hp;

				element = document.getElementById("defender_atk");
				element.innerHTML = defender.atk;

				element = document.getElementById("defender_spd");
				element.innerHTML = defender.spd;

				element = document.getElementById("defender_def");
				element.innerHTML = defender.def;

				element = document.getElementById("defender_res");
				element.innerHTML = defender.res;
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

function calculate(){
	var battleText = "";
	battleText += attacker.name + " initiates combat. ";

	var damageDealt = attacker.atk - defender.def;
	battleText += damageDealt + " damage dealt. ";
	defender.hpLeft = defender.hp - damageDealt;

	if (defender.hpLeft < 0){
		defender.hpLeft = 0;
	}
	battleText += "<br>" + "Defender, "+ defender.name + " HP: " + defender.hp + " -> " + defender.hpLeft;
	
	
	if (attacker.weaponName.indexOf("Brave") >= 0){
		if (defender.hpLeft != 0){
			var previousHpLeft = defender.hpLeft;
			defender.hpLeft = defender.hpLeft - damageDealt;
			if (defender.hpLeft < 0){
				defender.hpLeft = 0;
			}
			battleText += "<br><br>" + attacker.name + " attacks again immediately due to " + attacker.weaponName;
			battleText += "<br>" + damageDealt + " damage dealt. ";
			battleText += "<br>" + "Defender, "+ defender.name + " HP: " + previousHpLeft + " -> " + defender.hpLeft;

		} 
	}
		
	
	var element = document.getElementById("one_on_one");
	element.innerHTML = battleText;
}

function sortSelect(selElem) {
  for (var i = 0; i < (selElem.options.length - 1); i++)
      for (var j = i + 1; j < selElem.options.length; j++)
          if (parseInt(selElem.options[j].value) < parseInt(selElem.options[i].value)) {
              var dummy = new Option(selElem.options[i].text, selElem.options[i].value);
              selElem.options[i] = new Option(selElem.options[j].text, selElem.options[j].value);
              selElem.options[j] = dummy;
          }
}
