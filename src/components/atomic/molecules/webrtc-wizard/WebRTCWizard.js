import React, { useState, useEffect } from "react";

// steps:
// 1. select to create or scan offer
// 2. scan answer
// 3. scan ice candidate 1
// 4. scan ice candidate 2

export default ({
    onConnect,
    onReceive,
}) => {

    return (
        <div>
            <button onClick={onConnect}>Connect</button>
            <button onClick={onReceive}>Receive</button>
        </div>
    );
}