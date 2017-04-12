using UnityEngine;

public class SphereCommands : MonoBehaviour
{
	Vector3 originalPosition;
	bool placing = false;


	// Use this for initialization
	void Start()
	{
		// Grab the original local position of the sphere when the app starts.
		originalPosition = this.transform.localPosition;
	}

	// Called by GazeGestureManager when the user performs a Select gesture
	void OnSelect()
	{

		// If the sphere has a Rigidbody component, remove it to disable physics.
		var rigidbody = this.GetComponent<Rigidbody>();
		if (rigidbody != null)
		{
			DestroyImmediate(rigidbody);
		}

		// On each Select gesture, toggle whether the user is in placing mode.
		placing = !placing;

		// If the user is in placing mode, display the spatial mapping mesh.
		if (placing)
		{
			SpatialMapping.Instance.DrawVisualMeshes = true;
		}
		// If the user is not in placing mode, hide the spatial mapping mesh.
		else
		{
			SpatialMapping.Instance.DrawVisualMeshes = false;
            //originalPosition = this.transform.localPosition;
		}
	}

	// Called by SpeechManager when the user says the "Reset world" command
	void OnReset()
	{
		// If the sphere has a Rigidbody component, remove it to disable physics.
		var rigidbody = this.GetComponent<Rigidbody>();
		if (rigidbody != null)
		{
			DestroyImmediate(rigidbody);
		}

		// Put the sphere back into its original local position.
		this.transform.localPosition = originalPosition;
	}

	// Called by SpeechManager when the user says the "Drop" command
	void OnDrop()
	{
		// If the sphere has no Rigidbody component, add one to enable physics.
		if (!this.GetComponent<Rigidbody>())
		{
			var rigidbody = this.gameObject.AddComponent<Rigidbody>();
			rigidbody.collisionDetectionMode = CollisionDetectionMode.Continuous;
		}
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