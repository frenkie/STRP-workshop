using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;

public class HologramManager : MonoBehaviour
{

    public Button dataFetcher;
    public Text dataDisplayer;

    // Use this for initialization
    void Start()
    {
        Debug.Log("HololensStarted");
        StartCoroutine(GetText());
    }

    void doGetText()
    {
        StartCoroutine(GetText());
    }

    IEnumerator GetText()
    {
        using (UnityWebRequest www = UnityWebRequest.Get("http://ip169-109.vpro.nl:8080/list/"))
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
                // Or retrieve results as binary data
                byte[] results = www.downloadHandler.data;
            }
        }
    }
}
