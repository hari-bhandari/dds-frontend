import React from 'react';

const Documentation = () => {
    return (
    //    iframe that loads the documentation and has 100% width and height and the link is https://documenter.getpostman.com/view/10917205/UzJFwyak with style of
    //    height calc(100vh - 64px)
        <iframe src="https://dds-versioning.herokuapp.com/doc" width="100%" height="100vh" style={{height:"calc( 100vh - 70px",marginTop:"70px"}} frameBorder="0"></iframe>

    );
};

export default Documentation;