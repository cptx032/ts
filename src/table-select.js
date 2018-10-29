function TableSelection(e) {
    var t = this;
    t.tableid = e.tableid,
    t.actionbuttons = e.actionbuttons,
    t.onchange = e.onchange,
    t.trclass = e.trclass,
    t.actionbuttonsmode = e.actionbuttonsmode || "hide",
    t.insert_checkboxes(),
    t.update_action_buttons(),
    $(t.maincheckbox).change(function() {
        this.checked ? t.select_all() : t.unselect_all()
    }),
    $(t.get_childs_query()).change(function() {
        t.update_action_buttons(),
        e.onchange && e.onchange(t)
    })
}
TableSelection.prototype.insert_checkboxes = function() {
    var t = this;
    var e = t.trclass;
    t.maincheckbox = $('<input type="checkbox" class="TS TS-select">'),
    $(t.tableid + " thead tr").prepend($("<th>").append(t.maincheckbox)),
    $(t.tableid + " tbody tr" + ("" == e || e == undefined ? "" : "." + e)).each(function(e, t) {
        $(t).prepend('<td><input type="checkbox" class="TS TS-item-select"></td>')
    })
},
TableSelection.prototype.has_item_selected = function() {
    var e = !1;
    return $(this.get_childs_query()).each(function(t, n) {
        if ($(n).prop("checked"))
            return e = !0,
            !1
    }),
    e
},
TableSelection.prototype.get_childs_query = function() {
    return this.tableid + " input:checkbox.TS-item-select"
},
TableSelection.prototype.update_action_buttons = function() {
    var e = this;
    e.actionbuttons && (e.has_item_selected() ? "hide" === e.actionbuttonsmode ? $(e.actionbuttons).show() : "disable" === e.actionbuttonsmode && $(e.actionbuttons).prop("disabled", !1) : "hide" === e.actionbuttonsmode ? $(e.actionbuttons).hide() : "disable" === e.actionbuttonsmode && $(e.actionbuttons).prop("disabled", !0))
},
TableSelection.prototype.get_selected_ids = function() {
    var e = [];
    return $(this.get_childs_query() + ":checked").each(function(t, n) {
        e.push(n.parentElement.parentElement.id)
    }),
    e
},
TableSelection.prototype.select_all = function() {
    var e = this;
    $(e.get_childs_query() + ":visible").prop("checked", !0),
    e.maincheckbox.prop("checked", !0),
    e.update_action_buttons(),
    e.onchange && e.onchange(e)
},
TableSelection.prototype.unselect_all = function() {
    var e = this;
    $(e.get_childs_query() + ":visible").prop("checked", !1),
    e.maincheckbox.prop("checked", !1),
    e.update_action_buttons(),
    e.onchange && e.onchange(e)
};
