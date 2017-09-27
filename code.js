


/*
//sort heroes by name
data.heroes.sort(function(a,b){
	//console.log(a.name + ", " + b.name + ": " + a.name>b.name);
	return (a.name.toLowerCase() > b.name.toLowerCase())*2-1;
})

//Sort skills array by name
data.skills.sort(function(a,b){
	//console.log(a.name + ", " + b.name + ": " + a.name>b.name);
	return (a.name.toLowerCase() + a.slot > b.name.toLowerCase() + b.slot)*2-1;
})
*/
function initOptions(){
	//Initializes options from localStorage or from scratch

	//Holder for options that aren't hero-specific
	options = {};
	options.showOnlyMaxSkills = true;
	options.hideUnaffectingSkills = true;
	options.sortOrder = 1;
	options.roundInitiators = ["attacker initiates","Enemy initiates"];

	//Holder for attacker options and pre-calculated stats
	attacker = {};

	attacker.attacker = true;
	attacker.index = -1;
	attacker.merge = 0;
	attacker.rarity = 5;
	attacker.boon = "none";
	attacker.bane = "none";
	attacker.summoner = "none";
	attacker.ally = "none";

	//The following 6 arrays will be set from arrays generated in the heroes array so they don't have to be re-calculated
	attacker.naturalSkills = []; //Skills the hero has without having to inherit
	attacker.validWeaponSkills = [];
	attacker.validSpecialSkills = [];
	attacker.validASkills = [];
	attacker.validBSkills = [];
	attacker.validCSkills = [];

	attacker.weapon = -1;
	attacker.special = -1;
	attacker.a = -1;
	attacker.b = -1;
	attacker.c = -1;
	attacker.s = -1;

	attacker.hp = 0;
	attacker.atk = 0;
	attacker.spd = 0;
	attacker.def = 0;
	attacker.res = 0;

	attacker.damage = 0;
	attacker.precharge = 0;

}

initOptions();

var fightResults = []; //Needs to be global variable to get info for tooltip
var resultHTML = []; //Needs to be a global variable to flip sort order without

var showingTooltip = false;
var calcuwaiting = false;
var calcuwaitTime = 0;

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//Put DOM stuff in place

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//heroHTML = "<option value=-1 class=\"hero_option\">Select Hero</option>";
for (i = 0; i < data.heroes.length; i++){
	console.log(data.heroes[i].name);
	console.log(i);
	//heroHTML += "<option value=" + i + " class=\"hero_option\">" + data.heroes[i].name + "</option>";
	var option = document.createElement("option");
	option.text = data.heroes[i].name;
	option.value = i+1;
	var select = document.getElementById("attacker_name");
	select.appendChild(option);
}
