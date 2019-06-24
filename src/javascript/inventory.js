//Macros
Macro.add('StartingInventory', {
    handler: function() {
        for(var itemVariantNameIdx in window.inventory.startingInventory){
            var itemVariantName = window.inventory.startingInventory[itemVariantNameIdx];
            window.itemFuncs.addItemToInventory(itemVariantName);
        }
    }
});

//JS Functions
window.inventoryFuncs= {
    hasTag: function(item, tag){
        var locItem = SugarCube.State.active.variables.inventory[item];
        if(!(locItem === undefined)){
            if(!(locItem.tags[tag] === undefined)){
                return locItem.tags[tag];
            }
            else{
                var masterItem = window.items.itemMasters[locItem.masterItem];
                if(!(masterItem.tags[tag] === undefined)){
                    return masterItem.tags[tag];
                }
                else{
                    return false;
                }
            }
        }
        else{
            return false;
        }
    },
    notTag: function (item, tag){
        var locItem = SugarCube.State.active.variables.inventory[item];
        if(!(locItem === undefined)){
            if(!(locItem.tags[tag] === undefined)){
                return false;
            }
            else{
                var masterItem = window.items.itemMasters[locItem.masterItem];
                if(!(masterItem.tags[tag] === undefined)){
                    return false;
                }
                else{
                    return true;
                }
            }
        }
        else{
            return false;
        }
    },
    hasTagsAnd: function (item, tags){
        var hasTags = false;
        if(tags.constructor === Array){
            hasTags = true;
            for(var i = 0; i < tags.length && hasTags === true; i++){
                var hasTag = window.itemFuncs.hasTag(item, tags[i]);
                hasTags = hasTag;
            }
        }
        return hasTags;
    },
    hasTagsOr: function (item, tags){
        var hasTags = false;
        if(tags.constructor === Array){
            for(var i = 0; i < tags.length; i++){
                var hasTag = window.itemFuncs.hasTag(item, tags[i]);
                if(hasTag){
                    hasTags = hasTag;
                    break;
                }
            }
        }
        return hasTags;
    },
    notTagsAnd: function (item, tags){
        var notTags = false;
        if(tags.constructor === Array){
            notTags = true;
            for(var i = 0; i < tags.length && notTags === true; i++){
                var notTag = window.itemFuncs.notTag(item, tags[i]);
                notTags = notTag;
            }
        }
        return notTags;
    },
    notTagsOr: function (item, tags){
        var notTags = false;
        if(tags.constructor === Array){
            for(var i = 0; i < tags.length; i++){
                var notTag = window.itemFuncs.notTag(item, tags[i]);
                if(notTag){
                    notTags = notTag;
                    break;
                }
            }
        }
        return notTags;
    },

    getChildItemsForMaster: function(masterItem){
        var itemChildren = [];
        for(var itemName in SugarCube.State.active.variables.inventory){
            var item = SugarCube.State.active.variables.inventory[itemName];
            if(item.masterItem == masterItem){
                itemChildren.push(item);
            }
        }
        return itemChildren;
    },

    getItemByVariant: function(itemVariant){
        for(var itemName in SugarCube.State.active.variables.inventory){
            var item = SugarCube.State.active.variables.inventory[itemName];
            if(item.variant == itemVariant){
                return item;
            }
        }
        return false;
    },

    // buyItemVariant: function(itemVariant){
    //     console.log("buying item");
    //     for(var itemName in SugarCube.State.variables.inventory){
    //         var item = SugarCube.State.variables.inventory[itemName];
    //         if(item.variant == itemVariant){
    //             console.log("found item variant");
    //             if(item.price > 0){
    //                 //deduct cash
    //                 window.itemFuncs.addItemToInventory(item);
    //             }
    //             break;
    //         }
    //     }
    // },

    // addItemToInventory: function(item){
    //     console.log("adding item to inventory");
    //     if(!(window.inventoryFuncs.checkItemInInventory(item))){
    //         SugarCube.State.variables.inventory.push(item);
    //     }
    // },

    checkItemInInventory: function(item){
        var itemInInventory = false;
        for(var inventItemIdx in SugarCube.State.active.variables.inventory){
            var inventItem = SugarCube.State.active.variables.inventory[inventItemIdx];
            if(!(inventItem.variant === undefined) && inventItem.variant == item.variant){
                itemInInventory = true;
            }
        }
        return itemInInventory;
    },

    // getTagsForItem: function(item){
    //     var tags = [];
    //     for(var tagName in item.tags){
    //         if(item.tags[tagName] && tags.indexOf(tagName) < 0){
    //             tags.push(tagName);
    //         }
    //     }
    //     var masterItem = window.items.itemMasters[item.masterItem];
    //     for(var tagName in masterItem.tags){
    //         if(masterItem.tags[tagName] && tags.indexOf(tagName) < 0 && (item.tags[tagName] === undefined || item.tags[tagName])){
    //             tags.push(tagName);
    //         }
    //     }
    //     return tags;
    // },

    isItemVariantOwned: function(itemVariant){
        var ownedItems = window.inventoryFuncs.getChildItemsForMaster(itemVariant.masterItem);
        var ownedItemVariantNames = [];
        for(var ownedItemIdx in ownedItems){
            ownedItemVariantNames.push(ownedItems[ownedItemIdx].variant);
        }

        return ownedItemVariantNames.indexOf(itemVariant.variant) > -1
    },

}

window.inventory = {
    startingInventory: [
        "school_male",
        "male_pyjamas_00",
        "tshirt_jeans_00",
        "lucky_jocks_00",
        "black_shoes_00",
        "sneakers_00",
    ]
}