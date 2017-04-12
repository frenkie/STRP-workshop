using UnityEngine;
using UnityEngine.VR.WSA.Input;

public class GazeGestureManager : MonoBehaviour
{
	public static GazeGestureManager Instance { get; private set; }

	// Represents the hologram that is currently being gazed at.
	public GameObject FocusedObject { get; private set; }

	GestureRecognizer recognizer;

	// Use this for initialization
	void Start()
	{
		Instance = this;

		// Set up a GestureRecognizer to detect Select gestures.
		recognizer = new GestureRecognizer();
		recognizer.TappedEvent += (source, tapCount, ray) =>
		{
			// Send an OnSelect message to the focused object and its ancestors.
			if (FocusedObject != null)
			{
				FocusedObject.SendMessageUpwards("OnSelect", null, SendMessageOptions.DontRequireReceiver);
			}
		};
		recognizer.StartCapturingGestures();
	}

	// Update is called once per frame
	void Update()
	{
		// Figure out which hologram is focused this frame.
		GameObject oldFocusObject = FocusedObject;

		// Do a raycast into the world based on the user's
		// head position and orientation.
		var headPosition = Camera.main.transform.position;
		var gazeDirection = Camera.main.transform.forward;

		RaycastHit hitInfo;
		if (Physics.Raycast(headPosition, gazeDirection, out hitInfo))
		{
			// If the raycast hit a hologram, use that as the focused object.
			FocusedObject = hitInfo.collider.gameObject;
		}
		else
		{
			// If the raycast did not hit a hologram, clear the focused object.
			FocusedObject = null;
		}

		// If the focused object changed this frame,
		// start detecting fresh gestures again.
		if (FocusedObject != oldFocusObject)
		{
			recognizer.CancelGestures();
			recognizer.StartCapturingGestures();
		}

		// Enable mouse input
        if (Input.GetMouseButtonUp(0) && FocusedObject != null)
        {
    FocusedObject.SendMessageUpwards("OnSelect", null, SendMessageOptions.DontRequireReceiver);
        }

        // Enable keyboard input
        if (Input.GetKeyUp(KeyCode.E) && FocusedObject != null)
        {
    FocusedObject.SendMessageUpwards("OnErase", null, SendMessageOptions.DontRequireReceiver);
        }

        if (Input.GetKeyUp(KeyCode.C) && FocusedObject != null)
        {
    FocusedObject.SendMessageUpwards("OnDuplicate", null, SendMessageOptions.DontRequireReceiver);
        }

        if (Input.GetKeyUp(KeyCode.D))
        {
            this.BroadcastMessage("OnDrop", null, SendMessageOptions.DontRequireReceiver);
        }

        if (Input.GetKeyUp(KeyCode.R))
        {
            this.BroadcastMessage("OnReset", null, SendMessageOptions.DontRequireReceiver);
        }
        
	}
}