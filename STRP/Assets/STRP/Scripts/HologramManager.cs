using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;

public class HologramManager : MonoBehaviour
{

    public Button dataFetcher;

	private HologramAssets assets;
	private string dataHost = "https://vprostrp.herokuapp.com/";

    void Start()
    {
        Debug.Log("HololensStarted, press the button for data retrieval, or just call the doGetText method");

		if ( dataFetcher != null ) 
		{
			dataFetcher.onClick.AddListener (doGetAssets);
		}
    }

    void doGetAssets()
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
				assets = JsonUtility.FromJson<HologramAssets> (www.downloadHandler.text);
				Debug.Log ( "How many assets?" );
				Debug.Log ( assets.files.Length );		
            }
        }
    }
}
