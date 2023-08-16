import Player from '@vimeo/player';
import _ from 'lodash';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  _.throttle(function (data) {
    localStorage.setItem(
      'videoplayer-current-time',
      JSON.stringify(data.seconds)
    );
  }, 1000)
);

if (localStorage.getItem('videoplayer-current-time')) {
  player.setCurrentTime(
    JSON.parse(localStorage.getItem('videoplayer-current-time'))
  );
}
