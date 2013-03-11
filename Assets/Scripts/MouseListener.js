#pragma strict

var instantiated : GameObject;
var target : GameObject;

function OnMouseDown() {
	Debug.Log('Mouse Down!');
	instantiated = Instantiate(target, Input.mousePosition, Quaternion.identity);
}

function OnMouseUp() {
	Debug.Log('Objects within circle: ');
	var objs = target.GetComponent(Target).GetObjects();
	for (var o in objs)
	{
		Debug.Log(o.ToString);
	}
	Destroy(instantiated);
	instantiated = null;
}