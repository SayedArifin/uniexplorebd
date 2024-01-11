"use client"
import { barChart } from '@/action';
import React, { useRef, useState, useEffect } from 'react';

function Barchart() {
    const [chartData, setCartData] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);

    const tooltipContainerRef = useRef<HTMLDivElement | null>(null);
    const [tooltipContent, setTooltipContent] = useState('');
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [tooltipX, setTooltipX] = useState(0);
    const [tooltipY, setTooltipY] = useState(0);

    function findMaxValue(array: number[]) {
        let maxValue = array[0];

        for (let i = 1; i < array.length; i++) {
            if (array[i] > maxValue) {
                maxValue = array[i];
            }
        }

        return maxValue;
    }

    const showTooltip = (e: React.MouseEvent<HTMLDivElement>, data: number) => {
        setTooltipContent(e.currentTarget.textContent || '');
        setTooltipX(e.currentTarget.offsetLeft);
        setTooltipY(e.currentTarget.clientHeight + e.currentTarget.clientWidth / 2);
        setTooltipOpen(true);
    };

    const hideTooltip = () => {
        setTooltipContent('');
        setTooltipOpen(false);
        setTooltipX(0);
        setTooltipY(0);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await barChart();
            const shortNames = data.map((department) => department.shortName);
            const branchLengths = data.map((department) => department.branches.length);
            setLabels(shortNames);
            setCartData(branchLengths);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (tooltipOpen && tooltipContainerRef.current) {
            tooltipContainerRef.current.style.bottom = `${tooltipY}px`;
            tooltipContainerRef.current.style.left = `${tooltipX}px`;
        }
    }, [tooltipOpen, tooltipContainerRef, tooltipX, tooltipY]);

    const barWidth = Math.max(100 / chartData.length, 10);
    const barHeightFactor = 170 / findMaxValue(chartData);

    return (
        <div className="antialiased sans-serif w-full">
            <div className="px-4" data-x-data="app()" data-x-cloak>
                <div className="max-w-lg mx-auto">
                    <div className="">
                        <div className="md:flex md:justify-between md:items-center">
                            <div>{/* ... */}</div>
                            <div className="mb-4">{/* ... */}</div>
                        </div>
                        <div className="line my-8 relative">

                            <div className="flex flex-wrap -mx-2 items-end mb-2">
                                {chartData.map((data, index) => (
                                    <div key={index} className="px-2" style={{ width: `${barWidth}%` }}>
                                        <div
                                            style={{ height: `${data * barHeightFactor}px` }}
                                            className="transition ease-in duration-200 bg-primary-600 hover:bg-primary-400 relative"
                                            onMouseEnter={(e) => showTooltip(e, data)}
                                            onMouseLeave={hideTooltip}
                                        >
                                            <div className="text-center absolute top-0 left-0 right-0 -mt-6 text-sm">{data}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div
                                className="border-t border-gray-400 mx-auto"
                                style={{ height: '1px', width: `${100 - 1 / chartData.length * 100 + 3}%` }}
                            ></div>
                            <div className="flex flex-wrap -mx-2 items-end">
                                {tooltipOpen && (
                                    <div
                                        ref={tooltipContainerRef}
                                        className="p-0 m-0 z-10 shadow-lg rounded-lg absolute h-auto block"
                                    >
                                        <div className="shadow-xs rounded-lg bg-primary p-2">
                                            <div className="flex items-center justify-between text-sm text-white">
                                                <div>Branch Count:</div>
                                                <div className="font-bold ml-2">
                                                    <span dangerouslySetInnerHTML={{ __html: tooltipContent }}></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {labels.map((data, index) => (
                                    <div key={index} className="px-2" style={{ width: `${barWidth}%` }}>
                                        <div className="bg-red-600 relative">
                                            <div className="text-center absolute top-0 left-0 right-0 h-2 -mt-px bg-gray-400 mx-auto" style={{ width: '1px' }}></div>
                                            <div className="text-center absolute top-0 left-0 right-0 mt-3 text-xs whitespace-nowrap transform -rotate-90 origin-left">
                                                <div style={{ transform: 'rotate(90)', whiteSpace: 'nowrap', maxWidth: '100%', textOverflow: 'ellipsis' }}>{data}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Barchart;
