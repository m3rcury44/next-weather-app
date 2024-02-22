"use client"

import React, {FC, HTMLAttributes} from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const ReactQueryProvider: FC<HTMLAttributes<HTMLDivElement>> = ({children}) => {

    const client = new QueryClient()

    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;