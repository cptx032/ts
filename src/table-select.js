function TableSelection(opts) {
    var self = this;

    self.tableid = opts.tableid;
    self.actionbuttons = opts.actionbuttons;
    self.onchange = opts.onchange;

    // can ben 'hide' or 'disable'
    self.actionbuttonsmode = opts.actionbuttonsmode || 'hide';

    self.insert_checkboxes();
    self.update_action_buttons();

    $(self.maincheckbox).change(function() {
        if (this.checked) {
            self.select_all();
        }
        else {
            self.unselect_all();
        }
    });

    $(self.get_childs_query()).change(function() {
        self.update_action_buttons();
        if (opts.onchange) {
            opts.onchange(self);
        }
    });
}
TableSelection.prototype.insert_checkboxes = function() {
    var self = this;

    self.maincheckbox = $('<input type="checkbox" class="TS TS-select">');
    $(self.tableid + ' thead tr').prepend($('<th>').append(self.maincheckbox));

    $(self.tableid + ' tbody tr').each(function(index, item) {
        $(item).prepend('<td><input type="checkbox" class="TS TS-item-select"></td>');
    });
};

TableSelection.prototype.has_item_selected = function() {
    var self = this;

    var has_selected = false;
    $(self.get_childs_query()).each(function(index, item) {
        if ($(item).prop('checked')) {
            has_selected = true;
            // returns false breaks the jQuery.each function
            return false;
        }
    });
    return has_selected;
};

TableSelection.prototype.get_childs_query = function() {
    var self = this;

    return self.tableid + ' tbody tr td input:checkbox.TS-item-select';
};

TableSelection.prototype.update_action_buttons = function() {
    var self = this;

    if (self.actionbuttons) {
        if (self.has_item_selected()) {
            if (self.actionbuttonsmode === 'hide') {
                $(self.actionbuttons).show();
            }
            else if (self.actionbuttonsmode === 'disable') {
                $(self.actionbuttons).prop('disabled', false);
            }
        }
        else {
            if (self.actionbuttonsmode === 'hide') {
                $(self.actionbuttons).hide();
            }
            else if (self.actionbuttonsmode === 'disable') {
                $(self.actionbuttons).prop('disabled', true);
            }
        }
    }
};

TableSelection.prototype.get_selected_ids = function() {
    var self = this;
    var list_result = [];
    $(self.get_childs_query() + ':checked').each(function(index, item){
        list_result.push(item.parentElement.parentElement.id);
    });
    return list_result;
};

TableSelection.prototype.select_all = function() {
    var self = this;
    $(self.get_childs_query() + ':visible').prop('checked', true);
    self.maincheckbox.prop('checked', true);
    self.update_action_buttons();
    if (self.onchange) {
        self.onchange(self);
    }
};

TableSelection.prototype.unselect_all = function() {
    var self = this;
    $(self.get_childs_query() + ':visible').prop('checked', false);
    self.maincheckbox.prop('checked', false);
    self.update_action_buttons();
    if (self.onchange) {
        self.onchange(self);
    }
};
