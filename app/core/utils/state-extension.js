angular.module('hg.core.utils')

  /**
   *
   */
  .service('stateExt', function($state) {

    //
    function splitId(id) {
      id = id.split('.');

      return {
        self: id.slice(-1).pop(),
        parent: id.slice(-2, -1).pop(),
        path: id.slice(0, -1)
      };
    }

    //
    function filterStates(filter) {
      return $state.get().filter(filter);
    }

    //
    function getParentState(state) {
      return filterStates(function(fState) {
        return splitId(fState.name).self === splitId(state.name).parent;
      })[0] || null;
    }

    //
    function getSiblingStates(state) {
      return filterStates(function(fState) {
        return splitId(fState.name).parent === splitId(state.name).parent;
      });
    }

    //
    function getChildrenStates(state) {
      return filterStates(function(fState) {
        return splitId(fState.name).parent === splitId(state.name).self;
      });
    }

    /**
     *
     */
    this.addStateRelationships = function(state) {
      if (!state.name) return;

      state.data = state.data || {};

      state.data.parent = getParentState(state);
      state.data.siblings = getSiblingStates(state);
      state.data.children = getChildrenStates(state);
    };
  });
