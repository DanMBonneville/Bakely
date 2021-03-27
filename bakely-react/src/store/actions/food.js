import { db, storage } from '../../firebase';
import * as actionTypes from './actionTypes';

export const loadingStart = () => { return { type: actionTypes.LOADING_START } };
export const loadingEnd = () => { return { type: actionTypes.LOADING_END } };

export const clearFoodItems = () => {
    return {
        type: actionTypes.CLEAR_FOOD_ITEMS
    }
}

export const addFoodItemToStore = (id, itemToAdd) => {
    return {
        type: actionTypes.ADD_MENU_ITEM,
        foodId: id,
        foodItemToAdd: itemToAdd
    }
}

export const addEditFoodItem = (foodItem) => {
    return dispatch => {
        dispatch(loadingStart);
        const image = foodItem.image;
        storage.ref(`images/${image.name}`).put(image).on("state_changed", () => {},
            error => { console.log(error) },
            () => {
                storage.ref("images").child(image.name).getDownloadURL().then(url => {
                    let itemToAdd = {
                        ...foodItem,
                        'imageUrl': url
                    };
                    delete itemToAdd["image"];
                    db.collection("foodItems").add(itemToAdd).then(res => {
                        dispatch(addFoodItemToStore(res.d_.id, itemToAdd));
                    })
                })
            }
        )
    }
}

export const setAllFoodItems = () => {
    return dispatch => {
        dispatch(loadingStart());
        dispatch(clearFoodItems());
        db.collection("foodItems").get().then(foodItems => {
            foodItems.docs.forEach(item => {
                dispatch(addFoodItemToStore(item.id, item.data()));
            });
        }).catch(error => {
            console.log("Error in setting global food ", error);
        });
    };
}

export const getImageAndStore = () => {
    return dispatch => {

    }
}