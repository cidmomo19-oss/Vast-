export default {
  async fetch(request) {
    // --- SETTING URL DI SINI ---
    const VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
    const LINK_IKLAN = "https://shopee.co.id"; // Tujuan klik video
    const LINK_SOCIAL = "https://tokopedia.com"; // Tujuan klik icon kecil
    const GAMBAR_ICON = "https://via.placeholder.com/100x30"; // Gambar untuk social bar kecil
    // ---------------------------

    const vastXML = `
    <VAST version="3.0">
      <Ad id="ad-linear-strict">
        <InLine>
          <AdSystem>Worker_Linear_Vast</AdSystem>
          <AdTitle>Iklan Video Embed</AdTitle>
          <Error><![CDATA[https://example.com/error]]></Error>
          <Impression><![CDATA[https://example.com/impression]]></Impression>
          
          <Creatives>
            <Creative>
              <!-- 
                LINEAR AD = Video Iklan Standar 
                skipoffset="00:00:05" = Memberitahu player untuk munculkan tombol skip di detik ke-5
              -->
              <Linear skipoffset="00:00:05">
                <Duration>00:00:15</Duration>
                
                <TrackingEvents>
                  <Tracking event="start"><![CDATA[https://example.com/start]]></Tracking>
                  <Tracking event="firstQuartile"><![CDATA[https://example.com/first]]></Tracking>
                  <Tracking event="midpoint"><![CDATA[https://example.com/mid]]></Tracking>
                  <Tracking event="complete"><![CDATA[https://example.com/complete]]></Tracking>
                </TrackingEvents>
                
                <VideoClicks>
                  <ClickThrough><![CDATA[${LINK_IKLAN}]]></ClickThrough>
                </VideoClicks>
                
                <MediaFiles>
                  <!-- Penting: Type harus video/mp4 dan delivery progressive -->
                  <MediaFile delivery="progressive" type="video/mp4" width="1280" height="720" maintainAspectRatio="true" scalable="true">
                    <![CDATA[${VIDEO_URL}]]>
                  </MediaFile>
                </MediaFiles>
                
                <!-- FITUR ICONS (SOCIAL BAR BAWAAN VAST) -->
                <!-- Ini akan memunculkan gambar kecil di pojok player -->
                <Icons>
                    <Icon program="SocialAd" width="100" height="30" xPosition="right" yPosition="top" offset="00:00:02" duration="00:00:15">
                        <StaticResource type="image/jpeg"><![CDATA[${GAMBAR_ICON}]]></StaticResource>
                        <IconClicks>
                            <IconClickThrough><![CDATA[${LINK_SOCIAL}]]></IconClickThrough>
                        </IconClicks>
                    </Icon>
                </Icons>

              </Linear>
            </Creative>
          </Creatives>
        </InLine>
      </Ad>
    </VAST>
    `;

    return new Response(vastXML, {
      headers: {
        "content-type": "text/xml;charset=UTF-8",
        // HEADERS SAKTI ANTI BLOKIR (CORS)
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  },
};
