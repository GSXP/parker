#pragma strict

var mousePos : Vector3 = Vector3.zero;
var distance : int = 2;

function Update() {
    mousePos = Input.mousePosition;
    // Get mouse X and Y position as a percentage of screen width and height
    MoveMouse(mousePos.x/Screen.width, mousePos.y/Screen.height);
}
 
function MoveMouse(mousePosX : float, mousePosY : float) {
    transform.position.x = mousePosX;
    transform.position.y = mousePosY;
}

function GetObjects() {
	var mousePos2 : Vector3 = mousePos;
	var objPos : Vector3 = Vector3.zero;
	var obj : GameObject[];
	var returnObj : GameObject[] = [];
	mousePos2.z = 0;
	obj = GameObject.FindGameObjectsWithTag("Player");
	for (var o in obj)
	{
		objPos = o.transform.position;
		objPos.z = 0;
		var dist = Vector3.Distance(objPos, mousePos2);
		if (dist < distance)
		{
			Debug.Log('Adding!');
			returnObj += [o];
		}
	}
	return returnObj;
}