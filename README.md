# ts - Table Selection

<p align="center">
  <img src="screenshots/screenshot-01.png?raw=true" alt="Screenshot"/>
</p>

Suppose that you are using bootstrap to create this table:

```html
<table id="my-table" class="table table-striped table-borered">
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Weight</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>John</td>
      <td>23</td>
      <td>23</td>
    </tr>
    ...
  </tbody>
</table>
```

If you need select each item, and have options to show/hide when selecting items from this table you will need
create checkboxes for each item in table. With **ts** you can do this automagically:

```javascript
new TableSelection({
  tableid: '#my-table',
  actionbuttons: '#minus-button',
  actionbuttonsmode: 'disable'
});
```
