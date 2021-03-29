import { db, storage } from '../../firebase';
import * as actionTypes from './actionTypes';

// Reducer exports
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
export const addFoodItemEditsToStore = (foodItem) => {
    return {
        type: actionTypes.EDIT_MENU_ITEM,
        foodItem: foodItem
    }
}
// Asyncronous communication
export const addItem = (item) => {
    return dispatch => {
        db.collection("foodItems").add(item).then(res => {
            dispatch(addFoodItemToStore(res.d_.id, item));
        })
    }
}
export const editItem = (item) => {
    return dispatch => {
        db.collection("foodItems").doc(item.foodId).set(item).then(res => {
            dispatch(addFoodItemEditsToStore(item));
        })
    }
}
export const addOrEditItem = (foodItem, url ) => {
    return dispatch => {
            let itemToAdd = {
                ...foodItem,
                'imageUrl': url
            };
            delete itemToAdd["image"];
            if (foodItem.foodId) {
                dispatch(editItem(itemToAdd))
            } else {
                dispatch(addItem(itemToAdd))
            }
    }
}
export const addEditFoodItem = (foodItem) => {
    return dispatch => {
        dispatch(loadingStart);
        console.log("This is the object being passed into the add and edit food module:", foodItem);
        const image = foodItem.image;
        const imageRef = `${image.name}${foodItem.userId}`;
        storage.ref("images").child(imageRef).getDownloadURL().then((url) => {
            dispatch(addOrEditItem(foodItem,url));
        }).catch(() => {
            storage.ref(`images/${imageRef}`).put(image).on("state_changed", () => { },
                error => { console.log(error) },
                () => {
                    storage.ref("images").child(imageRef).getDownloadURL().then((url) => {
                        dispatch(addOrEditItem(foodItem,url));
                    })
                }
            )
        });
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