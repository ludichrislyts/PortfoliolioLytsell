<div ng-app="nodeListing">

   <div ng-controller="ListController">
    
     <h3>Filter</h3>
     <input ng-model="search" ng-change="doSearch()">

      <ul style="list-style:none">
        <li ng-repeat="node in nodes"><button style="width:100%;" ng-click="open(node.nid)">{{ node.title }}</button></li>
      </ul>

     <script type="text/ng-template" id="loadedNodeTemplate">
     <h3>{{ loadedNode.title }}</h3>
     {{ loadedNode.body }}
     </script>

    </div>

</div>

