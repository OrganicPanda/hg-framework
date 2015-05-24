angular.module('hg.pages.styleguide')

  .controller('HgStyleGuideTextEditorCtrl', function($scope) {
    $scope.data = {};

    $scope.data.content =
      '<h1>Be A Lean Author</h1>' +
      '<h2>An Interview with Patrick Vlaskovits</h2>' +

      '<p>Today we interview bestselling author and entrepreneur Patrick Vlaskovits, whose constant search for better ways of working has turned him into a formidable thought-leader in technology and business. His writing has been featured in the Harvard Business Review, the Wall Street Journal, and The Browser and he speaks at technology conferences nationally and internationally.</p>' +

      '<p>We asked Patrick about how he applied his thinking to his into self-publishing with his two books The Entrepreneur’s Guide to Customer Development and The Lean Entrepreneur. In his no-nonsense style, he reveals his approach and why a “Build It and They Will Come” mentality is bad for business as well as books.</p>' +

      '<p><b>Hi Patrick, great to have you here! As well as being a serial entrepreneur and startup mentor, you’re also the author of The Entrepreneur’s Guide to Customer Development and The Lean Entrepreneur. What prompted you to write these books?</b></p>' +

      '<p>With The Entrepreneur’s Guide to Customer Development, back in 2009, I had just come off wasting a lot of time and a lot of my own money building a web startup that failed. Someone mentioned The 4 Steps to the Epiphany to me and I started reading it.</p>' +

      '<p>At the time, Steve Blank’s work was highly unorthodox – he was the only (?) person saying that “Build It and They Will Come.” is not a good strategy.</p>' +

      '<p>I recommended my friends start reading Steve’s book so we could discuss his ideas – but few of my friends took me up on it. Meeting up with Brant Cooper and Hiten Shah in late 2009, they had similar problems – I believe it was Hiten who said “Someone needs to write the Cliff Notes to Steve’s book.”</p>';
  });
