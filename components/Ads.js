import React, { useEffect  } from 'react';

const AdsComponent = ({ dataAdSlot }) => {

    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }catch (e) {

        }
    },[]);

    return (
        <>
            <ins className="adsbygoogle bg-gray-50"
                style={{ display: "block" }}
                data-ad-client="ca-pub-5331978820452259"
                data-ad-slot={dataAdSlot}
                data-ad-format="auto"
                data-full-width-responsive="true">
            </ins>
        </>
    );
};

export default AdsComponent;