#pragma strict

// Behavior Component Interface that can be implemented allowing different objects 
// to react to the same action in different ways. e.g. aggro


var myBehavior : IBehavior;

// Didn't know where else to put these
var hurtSound : AudioClip;
var dieSound : AudioClip;

// Maps an implementation based on the object type
function Start() {
	var whoami : String = gameObject.name;
	if (whoami == "Hero") {
		myBehavior = new HeroBehavior(gameObject);
	} else if (whoami == "Mob") {
		myBehavior = new MobBehavior(gameObject);
	} else if (whoami == "Sidekick") {
		myBehavior = new SidekickBehavior(gameObject);
	} else {
		myBehavior = new IBehavior(gameObject);
		print("No known Behavior Implementation for " + gameObject.name);
	}
	
	myBehavior.dieSound = dieSound;
	myBehavior.hurtSound = hurtSound;
}

// If you got hit
function GotHit(attacker : GameObject) {
	myBehavior.GotHit(attacker);
}

// When you target is dead
function TargetDead() {
	myBehavior.TargetDead();
}

// When a new target is found, either through sight or friend getting attacked
function FoundNewTarget(target : GameObject, priority : int) {
	myBehavior.FoundNewTarget(target, priority);
}

// Gives behaviors access to the update cycle
function Update() {
	myBehavior.Update();
}

// fire
function FireSpell() {
	myBehavior.FireSpell();
}

// ice
function IceSpell() {
	myBehavior.IceSpell();
}

// Check if I'm in range of a spell cast
function CheckSpellRange(target : Vector3, spellType: int) {
	myBehavior.CheckSpellRange(target, spellType);
}

// Behavior Interface. Anything that can attack or be attacked should implement this
private class IBehavior {
	// Classes don't seem to have access to "gameObject" so you'll have to pass it in
	protected var gameObject : GameObject;
	var hurtSound : AudioClip;
	var dieSound : AudioClip;
	
	function IBehavior(go : GameObject) {
		gameObject = go;
	}
	
	// Hooks for Combat
	function GotHit(attacker : GameObject) {}
	function TargetDead() {}
	
	// Hook for finding new target through sight or by sidekick getting attacked
	function FoundNewTarget(target : GameObject, priority : int) {}
	
	// And here's access to the Update Function
	function Update() {}
	
	// fire
	function FireSpell() {}
	
	// ice
	function IceSpell() {}
	
	// Check if I'm in range of a spell cast
	function CheckSpellRange(target : Vector3, spellType : int) {}
}