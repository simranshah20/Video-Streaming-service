"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processVideoForHLS = void 0;
//convert video
const fs_1 = __importDefault(require("fs"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const resolutions = [
    { width: 1920, height: 1080, bitRate: 2000 }, //resolution for full HD(1080p)
    { width: 1280, height: 720, bitRate: 1000 }, //720p
    { width: 854, height: 480, bitRate: 500 }, //480p
    { width: 640, height: 360, bitRate: 400 }, //360p
    // { width: 256, height: 144, bitRate: 200 }, //144p
];
/**
 *
 * @param inputPath - The  path to the input video file
 * @param outputPath - The path there the process HLS files will be saved
 * @param callback - A callback function that is called when the processing is complete.
 *                   The callback receives an error object if an error occured,
 *                   and the master playlist string if the processing was successful.
 */
const processVideoForHLS = (inputPath, outputPath, callback) => {
    fs_1.default.mkdirSync(outputPath, { recursive: true }); //creates the output directory
    const masterPlayList = `${outputPath}/master.m3u8`; //path to the master playlist file
    const masterContent = [];
    let countProcessing = 0;
    resolutions.forEach((resolution) => {
        const variantOutput = `${outputPath}/${resolution.height}`;
        const variantPlayList = `${variantOutput}/playList.m3u8`; //path to variant playlist file
        fs_1.default.mkdirSync(variantOutput, { recursive: true }); //create the variant directory
        (0, fluent_ffmpeg_1.default)(inputPath)
            .outputOption([
            `-vf scale=w=${resolution.width}:h=${resolution.height}`,
            `-b:v ${resolution.bitRate}`,
            `-codec:v libx264`,
            `-codec:a aac`,
            `-hls_time 10`,
            `-hls_playlist_type vod`,
            `-hls_segment_filename ${variantOutput}/segment%03d.ts`,
        ])
            .output(variantPlayList) //output to the variant playlist file
            .on('end', () => {
            //when the processing ends for a resolution.add the cariant playlist to the mastercontent
            masterContent.push(`#EXT-X-STREAM-INF:BANDWIDTH = ${resolution.bitRate * 1000},
                    RESOLUTION=${resolution.width}x${resolution.height}\n
                    ${resolution.height}p/playlist.m3u8`);
            countProcessing += 1;
            if (countProcessing === resolutions.length) {
                console.log("Processing complete");
                console.log(masterContent);
                //when the processing ends for all resolution,create the master playlist
                fs_1.default.writeFileSync(masterPlayList, `#EXTM3U\n${masterContent.join('\n')}`);
                callback(null, masterPlayList); //call the callback with the master playlist path
            }
        })
            .on('error', (error) => {
            console.log("An error occured: ", error);
            callback(error); //call the calback with the error
        })
            .run();
    });
};
exports.processVideoForHLS = processVideoForHLS;
