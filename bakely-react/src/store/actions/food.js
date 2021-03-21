import { db, storage } from '../../firebase';
import * as actionTypes from './actionTypes';

export const loadingStart = () => { return { type: actionTypes.LOADING_START } };
export const loadingEnd = () => { return { type: actionTypes.LOADING_END } };


export const addFoodItemToStore = (id, itemToAdd) => {
    return {
        type: actionTypes.ADD_MENU_ITEM,
        id: id,
        foodItemToAdd: itemToAdd
    }
}

export const setFoodItems = (foodItems) => {
    return {
        type: actionTypes.SET_FOOD_ITEMS,
        footItems: foodItems
    }
}

export const addEditFoodItem = (foodItem) => {
    return dispatch => {
        dispatch(loadingStart);
        const image = foodItem.image;
        storage.ref(`images/${image.name}`).put(image).on("state_changed", snapshot => {}, 
            error => { console.log(error) },
            () => {
                storage.ref("images").child(image.name).getDownloadURL().then(url => {
                    let itemToAdd = {
                        ...foodItem,
                        'imageUrl': url
                    };
                    delete itemToAdd["image"];
                    db.collection("foodItems").add(itemToAdd).then(res => {
                        dispatch(addFoodItemToStore(res.d_.id, itemToAdd))
                    })
                })
            }
        )
    }
}

export const setAllFoodItems = () => {
    return dispatch => {
        dispatch(loadingStart);
        db.collection("foodItems").get(res => {
            //
            //
            //
            //
            // this is where I left off in the vendor flow
            console.log("this is the response",res);
            res.forEach(doc => {
                console.log("This is each doc: ", doc);
                dispatch(addFoodItemToStore(res.docs));
            });
        });

    }
}