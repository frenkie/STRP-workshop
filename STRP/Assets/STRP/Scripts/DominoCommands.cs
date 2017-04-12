using UnityEngine;

public class DominoCommands : MonoBehaviour
{
	Vector3 originalPosition;
	Quaternion originalRotation;
	bool placing = false;


	// Use this for initialization
	void Start()
	{
		// Grab the original local position and rotation of the domino when the app starts.
		originalPosition = this.transform.localPosition;
        originalRotation = this.transform.localRotation;
	}

	// Called by GazeGestureManager when the user performs a Select gesture
	void OnSelect()
	{

		// If the sphere has a Rigidbody component, remove it to disable physics.
		var rigidbody = this.GetComponent<Rigidbody>();


		// On each Select gesture, toggle whether the user is in placing mode.
		placing = !placing;

		// If the user is in placing mode, display the spatial mapping mesh.
		if (placing)
		{
            if (rigidbody != null)
            {
                rigidbody.isKinematic = true;
            }
		}
		// If the user is not in placing mode, hide the spatial mapping mesh.
		else
		{
            if (rigidbody != null)
            {
                rigidbody.isKinematic = false;
                rigidbody.WakeUp();
            }
		}
	}

	// Called by SpeechManager when the user says the "Reset world" command
	void OnReset()
	{
		// Put the sphere back into its original local position.
		this.transform.localPosition = originalPosition;
		this.transform.localRotation = originalRotation;
	}

    void OnDuplicate()
    {
        Vector3 newPosition = this.transform.position;
        newPosition.x = newPosition.x - 0.2f;

        GameObject cloned = Instantiate( this.gameObject, newPosition, this.transform.localRotation, this.transform.parent );
    }

	void OnErase()
	{
	    Destroy( this.gameObject );
	}

	void OnUpdate()
	{
		// If the user is in placing mode,
		// update the placement to match the user's gaze.
		if (placing)
		{
			// Do a raycast into the world that will only hit the Spatial Mapping mesh.
			var headPosition = Camera.main.transform.position;
			var gazeDirection = Camera.main.transform.forward;

			RaycastHit hitInfo;
			if (Physics.Raycast(headPosition, gazeDirection, out hitInfo,
				30.0f, SpatialMapping.PhysicsRaycastMask))
			{
				// Move this object to where the raycast hit the Spatial Mapping mesh.
				this.transform.position = hitInfo.point;

				// Rotate this object to face the user.
				Quaternion toQuat = Camera.main.transform.localRotation;
				toQuat.x = 0;
				toQuat.z = 0;
				this.transform.rotation = toQuat;
			}
		}
	}
}