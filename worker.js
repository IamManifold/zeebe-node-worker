//https://zeebe.joshwulf.com/quickstart/quickstart/
const { ZBClient } = require('zeebe-node')

function main() {

    const zbc = new ZBClient({
        onReady: () => console.log(`Connected!`),
        onConnectionError: () => console.log(`Disconnected!`)
    })


    zbc.createWorker("ImageInspectionWorker", "ImageInspection", (job, complete) => {
        console.log(job.variables);
        CompleteImageInspectionWorker(complete);
        console.log('Image Inspection Worker Completed');
    })

    zbc.createWorker("VideoInspectionWorker", "VideoInspection", (job, complete) => {
        console.log(job.variables);
        CompleteVideoInspectionWorker(complete);
        console.log('Video Inspection Worker Completed');
    })

    zbc.createWorker("HistogramMatchWorker", "HistogramMatch", (job, complete) => {
        console.log(job.variables);
        console.log('Histogram Match Worker Completed');
        CompleteHistogramMatchWorker(complete);
    })

/////////////////////////////////////////////////////////////////////////////////////

    function CompleteImageInspectionWorker(complete) {
        complete.success({ baseImageLocationSrc: 'C:/imagedir'});
    }

    function CompleteVideoInspectionWorker(complete) {
        complete.success({outputFramesSrc: ['outputFrames: C:/bob, outputFrames: c:/frame1, outputFrames : c:/frame2' ], baseImageLocationSrc : 'stuff'})
    }

    function CompleteHistogramMatchWorker(complete) {
        complete.success(console.log('Histo Completed'))
    }


};

main();