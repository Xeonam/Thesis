import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { fetchWords } from '../api/apiCalls';

function Words() {
    // fetch the words from the api
    const { data, isLoading, error } = useQuery({
        queryKey: ['words'],
        queryFn: fetchWords
    });

    // Log the data to the console
    console.log(data);

    // Handle loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Handle error state
    if (error) {
        return <div>Error! {error.message}</div>;
    }

    // Render the data
    return (
        <div>
            {data && (
                <div>
                    <h2>Words:</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default Words;
