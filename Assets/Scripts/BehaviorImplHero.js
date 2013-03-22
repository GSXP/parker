#pragma strict

// Hero's implementation of behavior
class HeroBehavior extends NPCBehavior {
	// A hit list to remember who to attack next
	private var hitList : HitList;

	// special states
	var speedy : boolean = false;
	var solid : boolean = false;
		
	function HeroBehavior(go : GameObject) {
		super(go);
		hitList = new HitList();
	}
	
	function GotHit(attacker : GameObject) {
		super.GotHit(attacker);
		FoundNewTarget(attacker, 2);
	}
	
	function TargetDead() {
		super.TargetDead();
		// Get the next target from the hit list
		if (hitList.size() > 0) {
			var pt : PriorityTarget = hitList.PopTarget();
			super.setTarget(pt.target, pt.priority);
		}
	}
	
	function FoundNewTarget(newTarget : GameObject, priority : int) {
		if (super.currentTarget == null) {
			// If I'm not chasing anyone, chase this guy
			super.setTarget(newTarget, priority);
		} else if(super.currentTarget == newTarget) {
			// I've already got this guy targeted!
			return;
		} else {
			// I'm busy now, add him to my hit list
			hitList.AddNewTarget(newTarget, priority);
		}
	}
	
	function Update() {
		// temp: pick a target at random
		if (super.currentTarget == null) {
			var random_mob = GameObject.Find("Mob");
			// make sure one exists
			if (random_mob) {
				// chase with lowest priority
				Debug.Log("hero: choosing new random target");
				FoundNewTarget(random_mob, 4);
			}
		}
		super.Update();
	}
	
	function FireSpell() {
		if (speedy) {
			stats.resetMoveSpeed();
			stats.resetAttackSpeed();
			speedy = false;
		}
		else {
			// visibily aflame
			stats.modMoveSpeed(1.6);
			stats.modAttackSpeed(1.6);
			speedy = true;
			solid = false; // you can only be one or the other
		}
	}
	
	function IceSpell() {
		if (solid) {
			stats.setDamageRatio(0.5);
			solid = false;
		}
		else {
			stats.setDamageRatio(1);
			solid = true;
			speedy = false; // you can only be one or the other
		}
	}
}