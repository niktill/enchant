import axios from 'axios';

// Check Log in status
export const checkLogInStatus = () => async (dispatch, getState) => {
  try {
    await axios.get('/api/status');
    dispatch({ type: 'LOG_IN_STATUS_SUCCESS' });
    return true;
  } catch (err) {
    // backend status is not good
    dispatch({ type: 'LOG_IN_STATUS_FAIL' });
    dispatch({
      type: 'ACTIVATE_ERROR_MESSAGE',
      payload: {
        header: 'Log in currently unavailable',
        message:
          'We are currently facing an issue with our log in service. Sorry!',
        type: 'error',
      },
    });
    throw err;
  }
};

// Check if current user is logged in, and if so, serialize spell names from user lists into spells from api
export const getCurrentUser = () => async (dispatch, getState) => {
  try {
    const { apiData } = getState();
    const res = await axios.get('/api/current_user');
    const serializedSpellBookSpells = apiData.spells.filter((spell) =>
      res.data.spellBookSpells.includes(spell.slug)
    );
    const serializedDailySpells = apiData.spells.filter((spell) =>
      res.data.dailySpells.includes(spell.slug)
    );
    dispatch({
      type: 'FETCH_USER',
      payload: {
        ...res.data,
        spellBookSpells: serializedSpellBookSpells,
        dailySpells: serializedDailySpells,
      },
    });
    return true;
  } catch (err) {
    dispatch({ type: 'FETCH_USER', payload: '' });
    return false;
  }
};

// Delete current user from database
export const deleteCurrentUser = () => async (dispatch, getState) => {
  const { currentUser } = getState();
  if (currentUser) {
    try {
      const res = await axios.delete('/api/current_user');
      if (res.status === 200) {
        window.location.href = '/accountDeleted.html';
      }
    } catch (err) {
      dispatch({
        // error in deleting current user
        type: 'ACTIVATE_ERROR_MESSAGE',
        payload: {
          header: 'Error in deleting account',
          message: 'Could not delete your account. Please contact an admin.',
          type: 'error',
        },
      });
      throw err;
    }
  }
};

// reset current user
export const resetCurrentUser = () => async (dispatch, getState) => {
  const { currentUser } = getState();
  if (currentUser) {
    try {
      await axios.post('/api/current_user/reset');
      dispatch({ type: 'RESET_ACCOUNT' });
      return dispatch({
        // successfully reset of current user
        type: 'ACTIVATE_SUCCESS_MESSAGE',
        payload: {
          header: 'Account successfully reset',
          message: 'Your account has been reset.',
          type: 'success',
        },
      });
    } catch (err) {
      dispatch({
        // error in deleting current user
        type: 'ACTIVATE_ERROR_MESSAGE',
        payload: {
          header: 'Error in reseting account',
          message: 'Could not reset your account. Please try again.',
          type: 'error',
        },
      });
      throw err;
    }
  }
};

// Fetch API data Action Creator
export const fetchAPIData = () => async (dispatch) => {
  try {
    // Fetch spell Data
    const response = await axios.get('/api/spells');
    console.log(response);
    dispatch({ type: 'API_DATA_FETCHED', payload: response.data.spells });
    return true;
  } catch (err) {
    console.log(err);
    dispatch({ type: 'API_DATA_ERROR' });
    throw err;
  }
};

// App ready to render action
export const appReadytoRender = () => {
  return {
    type: 'APP_READY',
  };
};

// Set App view action
export const setAppView = () => {
  return {
    type: 'SET_APP_VIEW',
    payload: { windowWidth: document.documentElement.clientWidth },
  };
};

// Select Spellbook Spell Action Creator
export const selectSpellbookSpell = (spell) => async (dispatch, getState) => {
  const { currentUser, dailySpells } = getState();
  // Check if user signed in
  if (currentUser) {
    try {
      dailySpells.some((el) => el.slug === spell.slug)
        ? await axios.delete('/api/current_user/dailyspells', {
            data: { spellSlug: spell.slug },
          })
        : await axios.post('/api/current_user/dailyspells', {
            spellSlug: spell.slug,
          });
    } catch {
      dispatch({
        // error in saving spell book spell to account
        type: 'ACTIVATE_ERROR_MESSAGE',
        payload: {
          header: 'Error in selecting spellbook spell',
          message: 'Could not save spellbook spell selection to your account.',
          type: 'error',
        },
      });
    }
  }
  dispatch({ type: 'SPELLBOOK_SPELL_SELECT', payload: spell });
};

// Select All Spell Action Creator
export const selectAllSpellsSpell = (spell) => async (dispatch, getState) => {
  const { currentUser, spellbookSpells, dailySpells } = getState();
  // Check if user signed in
  if (currentUser) {
    try {
      spellbookSpells.some((el) => el.slug === spell.slug)
        ? await axios.delete('/api/current_user/spellbookspells', {
            data: { spellSlug: spell.slug },
          })
        : await axios.post('/api/current_user/spellbookspells', {
            spellSlug: spell.slug,
          });
      // Do we need to remove a spell from Daily spell?
      if (dailySpells.some((el) => el.slug === spell.slug)) {
        await axios.delete('/api/current_user/dailyspells', {
          data: { spellSlug: spell.slug },
        });
      }
    } catch {
      // error in saving all spell select to account
      dispatch({
        type: 'ACTIVATE_ERROR_MESSAGE',
        payload: {
          header: 'Error in selecting spell',
          message: 'Could not save spell select to your account.',
          type: 'error',
        },
      });
    }
  }
  dispatch({ type: 'ALL_SPELLS_SPELL_SELECT', payload: spell });
};

// Filter Spells by Dnd Class Action Creator
export const selectSpellFilterClass = (spellFilterClassName, tabName) => {
  return {
    type: 'SPELL_FILTER_CLASS_SELECT',
    payload: { spellFilterClassName: spellFilterClassName, tabName: tabName },
  };
};

// Sort Spells by Level Action Creator
export const selectSortSpellLevel = (sorterName, tabName) => {
  return {
    type: 'SORT_SPELLS_SELECT',
    payload: { sorterName: sorterName, tabName: tabName },
  };
};

// Cast spell from Daily Spells Tab
export const castSpell = (spellLevel) => async (dispatch, getState) => {
  const { currentUser } = getState();
  // check if user is signed in
  if (currentUser) {
    try {
      await axios.post('/api/current_user/spellslots/cast', {
        spellLevel: spellLevel,
      });
    } catch {
      // error in saving spell cast to account
      dispatch({
        type: 'ACTIVATE_ERROR_MESSAGE',
        payload: {
          header: 'Error in casting spell',
          message: 'Could not save spell cast to your account.',
          type: 'error',
        },
      });
    }
  }
  dispatch({ type: 'CAST_SPELL', payload: { spellLevel: spellLevel } });
};

// Refill spell slots on Daily Spells Tab
export const refillSpellSlots = () => async (dispatch, getState) => {
  const { currentUser, spellSlots } = getState();
  // check if user is signed in
  if (currentUser) {
    try {
      const newSpellSlots = spellSlots.map((el) => [el[1], el[1]]);
      await axios.post('/api/current_user/spellslots/refill', {
        spellSlots: newSpellSlots,
      });
    } catch {
      // error in saving refill spell slots to account
      dispatch({
        type: 'ACTIVATE_ERROR_MESSAGE',
        payload: {
          header: 'Error in refilling spell slots',
          message: 'Could not save spell slot refill to your account.',
          type: 'error',
        },
      });
    }
  }
  dispatch({ type: 'REFILL_SPELL_SLOTS' });
};

// Set max spell slots on Daily Spells Tab
export const setMaxSpellSlots =
  (spellLevel, maxSpellSlots) => async (dispatch, getState) => {
    if (!maxSpellSlots || maxSpellSlots < 0) {
      maxSpellSlots = 0;
    }
    const { currentUser } = getState();
    // check if user is signed in
    if (currentUser) {
      try {
        await axios.post('/api/current_user/spellslots/max', {
          spellLevel: spellLevel,
          maxSpellSlots: maxSpellSlots,
        });
      } catch {
        // error in setting max spell slot to account
        dispatch({
          type: 'ACTIVATE_ERROR_MESSAGE',
          payload: {
            header: 'Error in setting spell slots',
            message: 'Could not save spell slots change to your account.',
            type: 'error',
          },
        });
      }
    }
    dispatch({
      type: 'SET_MAX_SPELL_SLOTS',
      payload: { spellLevel: spellLevel, maxSpellSlots: maxSpellSlots },
    });
  };

// Close Error Message Action Creator
export const closeEnchantMessage = () => {
  return {
    type: 'CLOSE_ENCHANT_MESSAGE',
  };
};
