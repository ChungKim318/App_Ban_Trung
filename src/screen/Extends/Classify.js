import React, { useEffect, useState, useRef } from 'react';
import { Block, Button } from '../../components';
import { Text, Dimensions, SafeAreaView, Platform, StyleSheet } from 'react-native';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { Camera } from 'expo-camera';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import Canvas from 'react-native-canvas';
import { onIsLoadingTrue , onIsLoadingFalse } from '../../Redux/action/appLoadingAction'
import { useDispatch } from 'react-redux'
import * as tmImage from '@teachablemachine/image';



const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const TensorCamera = cameraWithTensors(Camera);

const Classify = (props) => {
    // const [model, setModel] = useState(
    //    [
    //        {
    //            "bbox": [
    //                19.165424823760986,
    //                15.32900333404541,
    //                115.7576036453247,
    //                109.07014608383179
    //            ],
    //            "class":'laptop',
    //            "score":0.9156908392906189
    //        }
    //    ]
    // );
    const [model, setModel] = useState(null);
    const dispatch = useDispatch();
    const URL = "https://teachablemachine.withgoogle.com/models/ljgIFbCVb/";
    const modelURL = URL + "model.json";
     const metadataURL = URL + "metadata.json";


    let context = useRef();
    let canvas = useRef(Canvas);

    let textureDims = Platform.OS == 'ios'
        ? { height: 1920, width: 1080 }
        : { height: 1200, width: 1600 };

    const handleCameraStream = (images) => {
        const loop = async () => {
            const nextImageTensor = images.next().value;
            if (!model || !nextImageTensor)
                throw new Error('Không có model hoặc ảnh tensor')
            model
                .detect(nextImageTensor)
                .then(prediction => {
                    drawRectangle(prediction, nextImageTensor);
                })
                .catch((err) => {
                    console.log(err)
                })

            requestAnimationFrame(loop);
        };
        loop();
    }

    console.log('modelllllll', model)

    const drawRectangle = (predictions, nextImageTensor) => {
        if (!context.current || !canvas.current) return;

        const scaleWidth = windowWidth / nextImageTensor.shape[1];
        const scaleHeight = windowHeight / nextImageTensor.shape[0];

        const flipHorizontal = Platform.OS == 'ios' ? false : true;

        context.current.clearRect(0, 0, windowWidth, windowHeight);

        for (const prediction of predictions) {
            const [x, y, width, height] = prediction.bbox;

            const boundingBoxX = flipHorizontal
                ? canvas.current.width - x * scaleWidth - width * scaleWidth
                : x * scaleWidth;

            const boundingBoxY = y * scaleHeight;
            context.current.strokeRect(
                boundingBoxX,
                boundingBoxY,
                width * scaleWidth,
                height * scaleHeight);

            context.current.strokeText(
                prediction.class,
                boundingBoxX - 5,
                boundingBoxY - 5
            );

        }

    }

    const handleCanvas = async (can) => {
        if (can) {
            can.height = windowHeight;
            can.width = windowWidth;
            const ctx = can.getContext('2d');
            ctx.strokeStyle = 'red';
            ctx.fillStyle = 'red';
            ctx.lineWidth = 3;

            context.current = ctx;
            canvas.current = can;
        }

    }


    useEffect(() => {

     const acc =  async () => {
          const { status } = await Camera.requestPermissionsAsync();

        dispatch(onIsLoadingTrue())
          await tf.ready();
        dispatch(onIsLoadingFalse())
          console.log('đã sẵn sàng')
          dispatch(onIsLoadingTrue())
         let data = await tmImage.load(modelURL, metadataURL);
          dispatch(onIsLoadingFalse());
          console.log('datta',JSON.stringify(data))
      }
         
       acc()

    }, []);

    

    return (
        <Block style={styles.container} >
            {/* <TensorCamera
                style={styles.camera}
                type={Camera.Constants.Type.back}
                cameraTextureHeight={textureDims.height}
                cameraTextureWidth={textureDims.width}
                resizeHeight={200}
                resizeWidth={152}
                resizeDepth={3}
                onReady={handleCameraStream}
                autorender={true}
                useCustomShadersToResize={false}
            /> */}
            {/* <Canvas style={styles.canvas} ref={handleCanvas} /> */}
        </Block>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    camera: {
        width: '100%',
        height: '100%'
    },
    canvas: {
        position: 'absolute',
        zIndex: 10000000,
        width: '100%',
        height: '100%'
    }
})

export default Classify;