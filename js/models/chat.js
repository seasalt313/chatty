module.exports = Backbone.Model.extend({

    defaults: {
        user: null,
        message: null,
        array: [],
        answer: []
    },

    sendMessage: function(info) {
        this.set('array', info);
        this.trigger('change');
        this.save();
    },


})
