#pragma strict

private var stats : Stats;
private var charController : CharacterController;
private var face : FaceDirection;

private var hasTarget : boolean = false;
private var target : Vector3 = Vector3.zero;

var tPos : Vector3 = Vector3.zero;
var targetTexture : Texture;
private var tScale : int = 110;

private var rightMouseDown : boolean = false;

function Start() {
	stats = gameObject.GetComponent(Stats);
	charController = gameObject.GetComponent(CharacterController);
	face = gameObject.GetComponent(FaceDirection);
}

// Used by doors so sidekick doesn't continue trying to move towards door's center after teleport
function clearTarget() {
	hasTarget = false;
}

// Used to display the target if holding down the mouse button
function OnGUI() {
	if (Input.GetMouseButton(0)) {
		tPos = Input.mousePosition;
		tPos.y = Screen.height - tPos.y;
		Debug.Log("Position: " + tPos);
		//GUI.Box (Rect (tPos.x,tPos.y,120,120), "");
		GUI.DrawTexture (Rect (tPos.x-tScale, tPos.y-tScale, 2*tScale, 2*tScale),
				targetTexture, ScaleMode.ScaleToFit);
    }
}

function Update () {
	
	// left click: temp set all mobs aflame
	if (Input.GetMouseButtonUp(0)) {
		target = Camera.main.ScreenToWorldPoint(Input.mousePosition);
		target.z = 0;
		// This requires that all enemies have the tag 'Mob'
		for(var Mob : GameObject in GameObject.FindGameObjectsWithTag("Mob"))
		    Mob.GetComponent(Behavior).CheckSpellRange(target);
	}
	
	// hold right mouse to move
	if (Input.GetMouseButtonDown(1)) {
		rightMouseDown = true;
	}
	if (Input.GetMouseButtonUp(1)) {
		rightMouseDown = false;
	}

	var move : Vector3 = Vector3.zero;
	// Check if right-clicked to move
	if(rightMouseDown) {
		target = Camera.main.ScreenToWorldPoint(Input.mousePosition);
		target.z = 0;
		hasTarget = true;
	}
	// Move towards target (if there is one)
	if(hasTarget) {
		move = Vector3.MoveTowards(transform.position, target, stats.getMoveSpeed() * Time.deltaTime) - transform.position;
		charController.Move(move);
		if (transform.position == target)
			hasTarget = false;
	}
	// Check keyboard movement
	var horizontal = Input.GetAxis("Horizontal");
	var vertical = Input.GetAxis("Vertical");
	if (horizontal!=0 || vertical !=0) {
		hasTarget = false;
		move = Vector3(horizontal, vertical, -transform.position.z);
		move *= stats.getMoveSpeed() * Time.deltaTime;
		charController.Move(move);
	}
	// If moved, update face
	if (move != Vector3.zero)
		face.moved(move);
}