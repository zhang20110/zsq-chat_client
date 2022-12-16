import React from "react";

export default function Math(props: {data: string}) {
    const { data } = props;
    const myData = data.trim().split('\n');
    return (
        <>
            {
                myData.map((v: string) => {
                    const front = v.match(/^\s*/)[0]; // 前面的空格
                    const behind = v.match(/\s*$/)[0]; // 前面的空格
                    return <div style={{ whiteSpace: 'pre' }}>{front}<span>{"`" + v + "`"}</span>{behind}</div>
                })
            }
        </>
    )
}