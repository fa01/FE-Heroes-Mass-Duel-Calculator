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


//-------------------------------------------------- ATTACKER --------------------------------------------------//
attacker = {};
attacker.name = "";
attacker.id = 0;
attacker.positionInHeroDB = 0;
attacker.rarity = 0;
attacker.weapontype = "";
attacker.movetype = "";
attacker.color = "";

attacker.hp = 0;
attacker.atk = 0;
attacker.spd = 0;
attacker.def = 0;
attacker.res = 0;

attacker.weaponName = "";
attacker.weaponID = 0;
attacker.weaponHp = 0;
attacker.weaponAtk = 0;
attacker.weaponSpd = 0;
attacker.weaponDef = 0;
attacker.weaponRes = 0;


attacker.hpLeft = 0;

attacker.apassive = "";
attacker.apassiveBool = 0;
attacker.apassiveIndex = 0;

attacker.bpassive = "";
attacker.bpassiveText = "";
attacker.bpassiveIndex = 0;

attacker.cpassive = "";
attacker.cpassiveIndex = 0;

attacker.special = "";
attacker.specialIndex = 0;

attacker.assist = "";
attacker.assistIndex = 0;

attacker.hasBreaker = false;

attacker.possibleSkills = new Object();

//-------------------------------------------------- DEFENDER --------------------------------------------------//
defender = {};
defender.name = "";
defender.id = 0;
defender.positionInHeroDB = 0;
defender.rarity = 0;
defender.color = "";
defender.weapontype = "";
defender.movetype = "";

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

defender.apassive = "";
defender.apassiveIndex = 0;
defender.apassiveBool = 0;

defender.bpassive = "";
defender.bpassiveText = "";
defender.bpassiveIndex = 0;

defender.cpassive = "";
defender.cpassiveIndex = 0;

defender.special = "";
defender.specialIndex = 0;

defender.assist = "";
defender.assistIndex = 0;

defender.hasBreaker = false;

defender.possibleSkills = new Object();




var combatDecisions = new combatScenarios();

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
    attacker.id = select.options[select.selectedIndex].value;
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
			attacker.weapontype = data.heroes[i].weapontype;
			attacker.movetype = data.heroes[i].movetype;
			attacker.color = data.heroes[i].color;
			attacker.positionInHeroDB = i;
			getAttackerIcon(i);
		}
	}
	getHeroAssets(attackerID, 0);
	updateWithWeapon(0);
}


initAttacker();

for (i = 0; i < data.heroes.length; i++){
	var newDefender = document.createElement("option");
	newDefender.text = data.heroes[i].name;
	newDefender.value = data.heroes[i].hero_id;
	var addDefender = document.getElementById("defender_name");
	addDefender.appendChild(newDefender);
}

function initDefender(){

	var getDefender = document.getElementById("defender_name");
    var defenderID = getDefender.options[getDefender.selectedIndex].value;
    defender.name = getDefender.options[select.selectedIndex].text;
    //console.log(defender.name);
    var defenderRarity = document.getElementById("defender_rarity").value;
    defender.rarity = defenderRarity;

    for (i = 0; i < data.heroes.length; i++){
		if (data.heroes[i].hero_id == defenderID){
			defender.hp = data.heroes[i].basehp +  data.growths[defender.rarity - 1][data.heroes[i].hpgrowth];
			defender.atk = data.heroes[i].baseatk +  data.growths[defender.rarity - 1][data.heroes[i].atkgrowth];
			defender.spd = data.heroes[i].basespd +  data.growths[defender.rarity - 1][data.heroes[i].spdgrowth];
			defender.def = data.heroes[i].basedef +  data.growths[defender.rarity - 1][data.heroes[i].defgrowth];
			defender.res = data.heroes[i].baseres +  data.growths[defender.rarity - 1][data.heroes[i].resgrowth];
			defender.weapontype = data.heroes[i].weapontype;
			defender.movetype = data.heroes[i].movetype;
			defender.color = data.heroes[i].color;
			defender.positionInHeroDB = i;
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
		var assistSelect = document.getElementById("attacker_assist");
		var passiveAPicture = document.getElementById("attacker_a_picture");
		var passiveBPicture = document.getElementById("attacker_b_picture");
		var passiveCPicture = document.getElementById("attacker_c_picture");
		var heroID = attacker.id;
		var heroColor = attacker.color;
		var heroMoveType = attacker.movetype;
		var heroWeaponType = attacker.weapontype;
	}
	else{
		var weaponSelect = document.getElementById("defender_weapon");
		var passiveAoption = document.getElementById("defender_a");
		var passiveBoption = document.getElementById("defender_b");
		var passiveCoption = document.getElementById("defender_c");
		var specialSelect = document.getElementById("defender_special");
		var assistSelect = document.getElementById("defender_assist");
		var passiveAPicture = document.getElementById("defender_a_picture");
		var passiveBPicture = document.getElementById("defender_b_picture");
		var passiveCPicture = document.getElementById("defender_c_picture");
		var heroID = defender.id;
		var heroColor = defender.color;
		var heroMoveType = defender.movetype;
		var heroWeaponType = defender.weapontype;
	}
	removeOptions(weaponSelect);
	removeOptions(passiveAoption);
	removeOptions(passiveBoption);
	removeOptions(passiveCoption);
	removeOptions(specialSelect);
	removeOptions(assistSelect);
	passiveAPicture.src = "skills/noskill.png";
	passiveBPicture.src = "skills/noskill.png";
	passiveCPicture.src = "skills/noskill.png";

	var possibleAttributes = new Object();
	var skillIDArray = new Array();
	var amountofSkills = 0;
	for (i = 0; i < data.heroSkills.length; i++){
		if (data.heroSkills[i].hero_id == id_num){
			skillIDArray[amountofSkills] = data.heroSkills[i].skill_id;
			amountofSkills++;
		}
	}

	var prevMaxForWeapon = 0;
	var prevMaxForPassiveA = 0;
	var prevMaxForPassiveB = 0;
	var prevMaxForPassiveC = 0;
	var prevMaxForSpecial = 0;
	var prevMaxForAssist = 0;

	var noneOption = document.createElement("option");
	noneOption.text = "None";
	noneOption.value = "none";
	weaponSelect.appendChild(noneOption);

	noneOption = document.createElement("option");
	noneOption.text = "None";
	noneOption.value = "none";
	passiveAoption.appendChild(noneOption);

	noneOption = document.createElement("option");
	noneOption.text = "None";
	noneOption.value = "none";
	passiveBoption.appendChild(noneOption);

	noneOption = document.createElement("option");
	noneOption.text = "None";
	noneOption.value = "none";
	passiveCoption.appendChild(noneOption);

	noneOption = document.createElement("option");
	noneOption.text = "None";
	noneOption.value = "none";
	specialSelect.appendChild(noneOption);

	noneOption = document.createElement("option");
	noneOption.text = "None";
	noneOption.value = "none";
	assistSelect.appendChild(noneOption);

	passiveAoption.selectedIndex = -1;
	passiveBoption.selectedIndex = -1;
	passiveCoption.selectedIndex = -1;
	specialSelect.selectedIndex  = -1;
	assistSelect.selectedIndex   = -1;

	//getting all possible skills for hero
	for (i = 0; i < data.skills.length; i++){
		if (data.skills[i].slot == "weapon"){
			if (data.skills[i].inheritrule == heroWeaponType){
				var weaponOption = document.createElement("option");
				weaponOption.text = data.skills[i].name;
				weaponOption.value = data.skills[i].skill_id;
				weaponSelect.appendChild(weaponOption);

				for (j =0; j < skillIDArray.length; j++){
					if (skillIDArray[j] == weaponOption.value){
						if (prevMaxForWeapon < parseInt(weaponOption.value)){
							weaponSelect.selectedIndex = weaponSelect.length-1;
							prevMaxForWeapon = weaponOption.value;
						}
					}
				}
			}
			if (data.skills[i].inheritrule == "unique"){
				for (j =0; j < skillIDArray.length; j++){
					if (skillIDArray[j] == data.skills[i].skill_id){
						var weaponOption = document.createElement("option");
						weaponOption.text = data.skills[i].name;
						weaponOption.value = data.skills[i].skill_id;
						weaponSelect.appendChild(weaponOption);
						weaponSelect.selectedIndex = weaponSelect.length-1;
						prevMaxForWeapon = weaponOption.value;
						
					}
				}
			}
		}

		if (data.skills[i].slot == "a"){
			if (data.skills[i].inheritrule == "" || data.skills[i].inheritrule == "nonstaff" || data.skills[i].inheritrule == heroMoveType){
				var passiveA = document.createElement("option");
				passiveA.text = data.skills[i].name;
				passiveA.value = data.skills[i].skill_id;
				passiveAoption.appendChild(passiveA);



				for (j = 0; j < skillIDArray.length; j++){
					if (skillIDArray[j] == parseInt(passiveA.value)){
						if (prevMaxForPassiveA < parseInt(passiveA.value)){

							passiveAoption.selectedIndex = passiveAoption.length - 1;
							prevMaxForPassiveA = passiveA.value;

							var skillName = passiveA.text;
							var skillNamePath = skillName.split(" ").join("_");
							//passiveAPicture.src = "skills/" + skillNamePath + ".png";
							updateAPicture(id_num, attackerOrDefender, skillNamePath);
						}
					}
				}
			}
		}


		if (data.skills[i].slot == "b"){
			if (data.skills[i].inheritrule == "" || data.skills[i].inheritrule == "nonstaff" || data.skills[i].inheritrule == heroMoveType || (data.skills[i].inheritrule == "nongreen" && (heroColor == "blue" || heroColor == "red")) || (data.skills[i].inheritrule == "nonblue" && (heroColor == "green" || heroColor == "red")) || (data.skills[i].inheritrule == "nonred" && (heroColor == "green" || heroColor == "blue"))){
				var passiveB = document.createElement("option");
				passiveB.text = data.skills[i].name;
				passiveB.value = data.skills[i].skill_id;
				passiveBoption.appendChild(passiveB);

				for (j = 0; j < skillIDArray.length; j++){
					if (skillIDArray[j] == parseInt(passiveB.value)){
						if (prevMaxForPassiveB < parseInt(passiveB.value)){
							
							passiveBoption.selectedIndex = passiveBoption.length - 1;
							prevMaxForPassiveB = passiveB.value;

							var skillName = passiveB.text;
							var skillNamePath = skillName.split(" ").join("_");
							//passiveAPicture.src = "skills/" + skillNamePath + ".png";
							updateBPicture(id_num, attackerOrDefender, skillNamePath);
						}
					}
				}
			}
		}

		if (data.skills[i].slot == "c"){
			if (data.skills[i].inheritrule == "" || data.skills[i].inheritrule == "nonstaff" || data.skills[i].inheritrule == heroMoveType){
				var passiveC = document.createElement("option");
				passiveC.text = data.skills[i].name;
				passiveC.value = data.skills[i].skill_id;
				passiveCoption.appendChild(passiveC);

				for (j = 0; j < skillIDArray.length; j++){
					if (skillIDArray[j] == parseInt(passiveC.value)){
						if (prevMaxForPassiveC < parseInt(passiveC.value)){

							passiveCoption.selectedIndex = passiveCoption.length - 1;
							prevMaxForPassiveC = passiveC.value;

							var skillName = passiveC.text;
							var skillNamePath = skillName.split(" ").join("_");
							//passiveAPicture.src = "skills/" + skillNamePath + ".png";
							updateCPicture(id_num, attackerOrDefender, skillNamePath);
						}
					}
				}
			}
		}

		if (data.skills[i].slot == "special"){
			var specialOption = document.createElement("option");
			specialOption.text = data.skills[i].name;
			specialOption.value = data.skills[i].skill_id;
			specialSelect.appendChild(specialOption);

			for (j =0; j < skillIDArray.length; j++){
				if (skillIDArray[j] == parseInt(specialOption.value)){
					if (prevMaxForSpecial < specialOption.value){
						specialSelect.selectedIndex = specialSelect.length-1;
						prevMaxForSpecial = specialOption.value;

					}
				}
			}
		}

		if (data.skills[i].slot == "assist"){
			if (data.skills[i].inheritrule == "nonstaff" && heroWeaponType != "staff"){
				var assistOption = document.createElement("option");
				assistOption.text = data.skills[i].name;
				assistOption.value = data.skills[i].skill_id;
				assistSelect.appendChild(assistOption);

				for (j =0; j < skillIDArray.length; j++){
					if (skillIDArray[j] == parseInt(assistOption.value)){
						if (prevMaxForAssist < assistOption.value){
							assistSelect.selectedIndex = assistSelect.length-1;
							prevMaxForAssist = assistOption.value;
						}
					}
				}
			}
		}
	}

	var combatDecisions = new combatScenarios();
	//  ------------------ CHANGE ATTACKER ASSETS TO LAST ONE IN LIST ----------------------
	if (attackerOrDefender == 0){

		var weaponValue = weaponSelect[weaponSelect.selectedIndex];
		attacker.weaponID = weaponValue.value;
		attacker.weaponName = weaponValue.text;

		var getLastAPassive = document.getElementById("attacker_a");
		attacker.apassive = getLastAPassive[getLastAPassive.selectedIndex].value;
		combatDecisions.aPassive(0);
		attacker.apassiveBool = 1;

		var getLastBPassive = document.getElementById("attacker_b");
		attacker.bpassive = getLastBPassive[getLastBPassive.selectedIndex].value;
		attacker.bpassiveText = getLastBPassive[getLastBPassive.selectedIndex].text;

		var getLastCPassive = document.getElementById("attacker_c");
		attacker.cpassive = getLastCPassive[getLastCPassive.selectedIndex].value;

		var getLastSpecial = document.getElementById("attacker_special");
	}

	//  ------------------ CHANGE DEFENDER ASSETS TO LAST ONE IN LIST ----------------------
	else{
		var weaponValue = weaponSelect[weaponSelect.selectedIndex];
		defender.weaponID = weaponValue.value;
		defender.weaponName = weaponValue.text;

		getLastAPassive = document.getElementById("defender_a");
		defender.apassive = getLastAPassive[getLastAPassive.selectedIndex].value;
		combatDecisions.aPassive(1);
		defender.apassiveBool = 1;

		getLastBPassive = document.getElementById("defender_b");
		defender.bpassive = getLastBPassive[getLastBPassive.selectedIndex].value;
		defender.bpassiveText = getLastBPassive[getLastBPassive.selectedIndex].text;

		getLastCPassive = document.getElementById("defender_c");

		getLastSpecial = document.getElementById("defender_special");
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
				//console.log(defender.weaponAtk);
				defender.weaponSpd = data.skills[i].spd;
				defender.weaponDef = data.skills[i].def;
				defender.weaponRes = data.skills[i].res;

				defender.hp += defender.weaponHp;
				defender.atk += defender.weaponAtk;
				//console.log(defender.atk);
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

function combatScenarios(){
	this.hasBraveWeapon = function(weaponName){
		if (weaponName.indexOf("Brave") >= 0 || weaponName.indexOf("Dire Thunder") >= 0 || weaponName.indexOf("Amiti") >= 0){
			return true;
		}
		else{
			return false;
		}
	}

	this.hasBreakerSkill = function(bpassive){
		if (bpassive.indexOf("breaker") >= 0){
			return true;
		}
		else{
			return false;
		}
	}

	this.hasWeaponAdvantage = function(attackerWeaponType, defenderWeaponType){
		if (attackerWeaponType == "sword" && defenderWeaponType == "lance"){
			console.log("attacker's weapon = "+ attackerWeaponType);
			console.log("defender's weapon = "+ defenderWeaponType);
			var advantage = Math.floor(defender.atk * 1.2);
			defender.atk = advantage;

			var disadvantage = Math.floor(attacker.atk * 0.8);
			attacker.atk = disadvantage;
		}
		else if (attackerWeaponType == "lance" && defenderWeaponType == "axe"){
			var advantage = Math.floor(defender.atk * 1.2);
			defender.atk = advantage;

			var disadvantage = Math.floor(attacker.atk * 0.8);
			attacker.atk = disadvantage;
		}
		else if (attackerWeaponType == "axe" && defenderWeaponType == "sword"){
			var advantage = Math.floor(defender.atk * 1.2);
			defender.atk = advantage;

			var disadvantage = Math.floor(attacker.atk * 0.8);
			attacker.atk = disadvantage;
		}
		else if (attackerWeaponType == "lance" && defenderWeaponType == "sword"){
			var advantage = Math.floor(attacker.atk * 1.2);
			attacker.atk = advantage;

			var disadvantage = Math.floor(defender.atk * 0.8);
			defender.atk = disadvantage;
		}
		else if (attackerWeaponType == "axe" && defenderWeaponType == "lance"){
			var advantage = Math.floor(attacker.atk * 1.2);
			attacker.atk = advantage;

			var disadvantage = Math.floor(defender.atk * 0.8);
			defender.atk = disadvantage;
		}
		else if (attackerWeaponType == "sword" && defenderWeaponType == "axe"){
			var advantage = Math.floor(attacker.atk * 1.2);
			attacker.atk = advantage;

			var disadvantage = Math.floor(defender.atk * 0.8);
			defender.atk = disadvantage;
		}

	}

	this.aPassive = function(aORd){

		if (aORd == 0){
			if (attacker.apassiveBool == 1){
				
				//console.log("previous aPassive skill is: ");
				//console.log(data.skills[attacker.apassiveIndex]);
				//console.log("in delete aPassive : Attack before is "+ attacker.atk);
				attacker.hp -= data.skills[attacker.apassiveIndex].hp;
				attacker.atk -= data.skills[attacker.apassiveIndex].atk;
				//console.log("in delete aPassive : Attack after is "+ attacker.atk);
				attacker.spd -= data.skills[attacker.apassiveIndex].spd;
				attacker.def -= data.skills[attacker.apassiveIndex].def;
				attacker.res -= data.skills[attacker.apassiveIndex].res;
			}
			for (i = 0; i < data.skills.length; i++){
				if (attacker.apassive == data.skills[i].skill_id){
					attacker.apassiveIndex = i;
					attacker.hp += data.skills[i].hp;
					attacker.atk += data.skills[i].atk;
					attacker.spd += data.skills[i].spd;
					attacker.def += data.skills[i].def;
					attacker.res += data.skills[i].res;
				}
			}

		}
		else{
			if (defender.apassiveBool == 1){
				defender.hp -= data.skills[defender.apassiveIndex].hp;
				defender.atk -= data.skills[defender.apassiveIndex].atk;
				defender.spd -= data.skills[defender.apassiveIndex].spd;
				defender.def -= data.skills[defender.apassiveIndex].def;
				defender.res -= data.skills[defender.apassiveIndex].res;
			}
			
			for (i = 0; i < data.skills.length; i++){
				if (defender.apassive == data.skills[i].skill_id){
					defender.apassiveIndex = i;
					defender.hp += data.skills[i].hp;
					defender.atk += data.skills[i].atk;
					defender.spd += data.skills[i].spd;
					defender.def += data.skills[i].def;
					defender.res += data.skills[i].res;
				}
			}
		}
	}

	this.bPassive = function(aORd){
		if (aORd == 0){
			if (this.hasBreakerSkill(attacker.bpassiveText) == true){
				if (attacker.bpassiveText.includes("Sword") && defender.weapontype == "sword"){
					attacker.hasBreaker = true;
				}
				else if (attacker.bpassiveText.includes("Axe") && defender.weapontype == "axe"){
					attacker.hasBreaker = true;
				}
				else if (attacker.bpassiveText.includes("Lance") && (defender.weapontype == "lance")){
					attacker.hasBreaker = true;
					console.log("hey~");
				}
				else if (attacker.bpassiveText.includes("R Tome") && defender.weapontype == "redtome"){
					attacker.hasBreaker = true;
				}
				else if (attacker.bpassiveText.includes("G Tome") && defender.weapontype == "greentome"){
					attacker.hasBreaker = true;
				}
				else if (attacker.bpassiveText.includes("B Tome") && defender.weapontype == "bluetome"){
					attacker.hasBreaker = true;
				}
			}
			else{
				attacker.hasBreaker = false;
			}
		}
		else{
			console.log(defender.bpassiveText);
			if (this.hasBreakerSkill(defender.bpassiveText) == true){
				if (defender.bpassiveText.includes("Sword") && attacker.weapontype == "sword"){
					defender.hasBreaker = true;
				}
				else if (defender.bpassiveText.includes("Axe") && attacker.weapontype == "axe"){
					defender.hasBreaker = true;
				}
				else if (defender.bpassiveText.includes("Lance") && (attacker.weapontype == "lance")){
					defender.hasBreaker = true;
					console.log("defender hey~");
				}
				else if (defender.bpassiveText.includes("R Tome") && attacker.weapontype == "redtome"){
					defender.hasBreaker = true;
				}
				else if (defender.bpassiveText.includes("G Tome") && attacker.weapontype == "greentome"){
					defender.hasBreaker = true;
				}
				else if (defender.bpassiveText.includes("B Tome") && attacker.weapontype == "bluetome"){
					defender.hasBreaker = true;
				}
			}
			else{
				defender.hasBreaker = false;
			}
		}
	}
}

function updateAPassive(attackerOrDefender){

	if (attackerOrDefender == 0){
		
		var aPassive = document.getElementById("attacker_a");
		attacker.apassive = aPassive.options[aPassive.selectedIndex].value;
		combatDecisions.aPassive(0);

		var skillName = aPassive.options[aPassive.selectedIndex].text;
		var skillNamePath = skillName.split(" ").join("_");
		//passiveAPicture.src = "skills/" + skillNamePath + ".png";
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
		updateAPicture(attacker.positionInHeroDB, attackerOrDefender, skillNamePath);
	}
	else{
		
		var aPassive = document.getElementById("defender_a");
		defender.apassive = aPassive.options[aPassive.selectedIndex].value;
		combatDecisions.aPassive(1);

		var skillName = aPassive.options[aPassive.selectedIndex].text;
		var skillNamePath = skillName.split(" ").join("_");
		//passiveAPicture.src = "skills/" + skillNamePath + ".png";
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
		updateAPicture(defender.positionInHeroDB, attackerOrDefender, skillNamePath);
	}
}

function updateBPassive(attackerOrDefender){
	if (attackerOrDefender == 0){
		
		var bPassive = document.getElementById("attacker_b");
		attacker.bpassive = bPassive.options[bPassive.selectedIndex].value;
		attacker.bpassiveText = bPassive[bPassive.selectedIndex].text;

		combatDecisions.bPassive(0);

		var skillName = bPassive.options[bPassive.selectedIndex].text;
		var skillNamePath = skillName.split(" ").join("_");
		updateBPicture(attacker.positionInHeroDB, attackerOrDefender, skillNamePath);
	}
	else{
		
		var bPassive = document.getElementById("defender_b");
		defender.bpassive = bPassive.options[bPassive.selectedIndex].value;
		defender.bpassiveText = bPassive[bPassive.selectedIndex].text;

		combatDecisions.bPassive(1);

		var skillName = bPassive.options[bPassive.selectedIndex].text;
		var skillNamePath = skillName.split(" ").join("_");
		updateBPicture(defender.positionInHeroDB, attackerOrDefender, skillNamePath);
	}
}
function calculate(){
	//Setup
	var attackerName = attacker.name.fontcolor("turquoise");
	var defenderName = defender.name.fontcolor("red");
	//console.log(defender.name);
	//Checking if attacker or defender will double
	var attackerSpdGreater = 0;
	var defenderSpdGreater = 0;
	//console.log(attacker.spd);
	//console.log(defender.spd);
	if (attacker.spd - defender.spd >= 5){
		attackerSpdGreater = 1;
	}
	else if (defender.spd - attacker.spd >= 5){
		defenderSpdGreater = 1;
	}
	var attackerAtk = attacker.atk;
	var defenderAtk = defender.atk;

	combatDecisions.hasWeaponAdvantage(attacker.weapontype, defender.weapontype);

	combatDecisions.bPassive(0);
	combatDecisions.bPassive(1);


	//Initiating Combat
	var battleText = "<br>";
	battleText += attackerName + " initiates combat. ";

	var damageDealt = attacker.atk - defender.def;
	if (damageDealt < 0){
		damageDealt = 0;
	}
	battleText += damageDealt + " damage dealt. ";
	defender.hpLeft = defender.hp - damageDealt;

	if (defender.hpLeft < 0){
		defender.hpLeft = 0;
	}
	battleText += "<br>" + defenderName + " HP: " + defender.hp + " -> " + defender.hpLeft;
	
	
	if (combatDecisions.hasBraveWeapon(attacker.weaponName) == true){
		if (defender.hpLeft != 0){
			var previousHpLeft = defender.hpLeft;
			defender.hpLeft = defender.hpLeft - damageDealt;
			if (defender.hpLeft < 0){
				defender.hpLeft = 0;
			}
			battleText += "<br><br>" + attackerName + " attacks again immediately due to " + attacker.weaponName;
			battleText += "<br>" + damageDealt + " damage dealt. ";
			battleText += "<br>" + defenderName + " HP: " + previousHpLeft + " -> " + defender.hpLeft;
			battleText += "<br>";
		} 
	}

	if (defender.hpLeft != 0){
		damageDealt = defender.atk - attacker.def;
		if (damageDealt < 0){
			damageDealt = 0;
		}
		attacker.hpLeft = attacker.hp - damageDealt;
		battleText += "<br>" + defenderName + " counterattacks. ";
		battleText += damageDealt + " damage dealt.";
		battleText += "<br>" + attackerName + " HP: " + attacker.hp + " -> " + attacker.hpLeft;

		if (combatDecisions.hasBraveWeapon(defender.weaponName) == true){
			if (attacker.hpLeft != 0){
				var previousHpLeft = attacker.hpLeft;
				attacker.hpLeft = attacker.hpLeft - damageDealt;
				if (attacker.hpLeft < 0){
					attacker.hpLeft = 0;
				}
				battleText += "<br><br>" + defenderName + " attacks again immediately due to " + defender.weaponName;
				battleText += "<br>" + damageDealt + " damage dealt. ";
				battleText += "<br>" + attackerName + " HP: " + previousHpLeft + " -> " + attacker.hpLeft;
				battleText += "<br>";
			} 
		}
		if (attacker.hpLeft == 0 || defender.hpLeft == 0){

		}
		else{
			console.log("attacker has breaker = " + attacker.hasBreaker);
			console.log("defender has breaker = " + defender.hasBreaker);
			// no breakers for either
			var breakerDecision = 0;
			//breaker - breaker
			if (attacker.hasBreaker == true && defender.hasBreaker == true){
				breakerDecision = 1;
			}
			//breaker - no breaker
			else if (attacker.hasBreaker == true && defender.hasBreaker == false){
				breakerDecision = 2;

				damageDealt = attacker.atk - defender.def;
				previousHpLeft = defender.hpLeft;
				defender.hpLeft = defender.hpLeft - damageDealt;
				if (defender.hpLeft < 0){
					defender.hpLeft = 0;
				}
				battleText += "<br>" + attackerName + " makes a follow-up attack due to " + attacker.bpassiveText + ".";
				battleText += "<br>" + damageDealt + " damage dealt. ";
				battleText += "<br>" + defenderName + " HP: " + previousHpLeft + " -> " + defender.hpLeft;
				battleText += "<br>";

				if (combatDecisions.hasBraveWeapon(attacker.weaponName) == true){
					if (defender.hpLeft != 0){
						previousHpLeft = defender.hpLeft;
						defender.hpLeft = defender.hpLeft - damageDealt;
						if (defender.hpLeft < 0){
							defender.hpLeft = 0;
						}
						battleText += "<br><br>" + attackerName + " attacks again immediately due to " + attacker.weaponName;
						battleText += "<br>" + damageDealt + " damage dealt. ";
						battleText += "<br>" + defenderName + " HP: " + previousHpLeft + " -> " + defender.hpLeft;
						battleText += "<br>";
					} 
				}
			}

			// no breaker - breaker
			else if (attacker.hasBreaker == false && defender.hasBreaker == true){
				breakerDecision = 3;
			}

			if (breakerDecision == 0 || breakerDecision == 1){
				if (attackerSpdGreater == 1){
					if (defender.hpLeft != 0){
						damageDealt = attacker.atk - defender.def;
						previousHpLeft = defender.hpLeft;
						defender.hpLeft = defender.hpLeft - damageDealt;
						if (defender.hpLeft < 0){
							defender.hpLeft = 0;
						}
						battleText += "<br>" + attackerName + " makes a follow-up attack."
						battleText += "<br>" + damageDealt + " damage dealt. ";
						battleText += "<br>" + defenderName + " HP: " + previousHpLeft + " -> " + defender.hpLeft;
						battleText += "<br>";
					}
				}

				if (defenderSpdGreater == 1){
					if (attacker.hpLeft != 0){
						damageDealt = defender.atk - attacker.def;
						previousHpLeft = attacker.hpLeft;
						attacker.hpLeft = attacker.hpLeft - damageDealt;
						if (attacker.hpLeft < 0){
							attacker.hpLeft = 0;
						}
						battleText += "<br>" + defenderName + " makes a follow-up attack."
						battleText += "<br>" + damageDealt + " damage dealt. ";
						battleText += "<br>" + attackerName + " HP: " + previousHpLeft + " -> " + attacker.hpLeft;
						battleText += "<br>";
					}
				}
			}
		}
	}

	if (defender.hpLeft != 0 && attacker.hpLeft != 0){
		battleText += "<br>" + "Draw!";
	}
	else if (defender.hpLeft == 0){
		battleText += "<br>" + "Attacker, " + attacker.name + " wins!";
	}
	else{
		battleText += "<br>" + "Defender, " + defender.name + " wins!";
	}
	
	var element = document.getElementById("one_on_one");
	element.innerHTML = battleText;

	attacker.atk = attackerAtk;
	defender.atk = defenderAtk;
	
	
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
