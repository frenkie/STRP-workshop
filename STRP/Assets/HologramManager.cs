using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;

public class HologramManager : MonoBehaviour
{

    public Button dataFetcher;
    public Text dataDisplayer;

	private HologramAssets assets;
	private string dataHost = "https://vprostrp.herokuapp.com/";

    // Use this for initialization
    void Start()
    {
        Debug.Log("HololensStarted, press the button for data retrieval, or just call the doGetText method");

		dataFetcher.onClick.AddListener (doGetText);
    }

    void doGetText()
    {
		StartCoroutine(GetAssets());
    }

    IEnumerator GetAssets()
    {
		using (UnityWebRequest www = UnityWebRequest.Get( dataHost +"list/"))
        {
            yield return www.Send();

            if (www.isError)
            {
                Debug.Log(www.error);
            }
            else
            {
                // Show results as text
                Debug.Log(www.downloadHandler.text);

                if (dataDisplayer != null)
                {
                    dataDisplayer.text = www.downloadHandler.text;
                }

				assets = JsonUtility.FromJson<HologramAssets> (www.downloadHandler.text);
				Debug.Log ( "How many assets?" );
				Debug.Log ( assets.files.Length );

                // Or retrieve results as binary data
                byte[] results = www.downloadHandler.data;
            }
        }
    }
}
