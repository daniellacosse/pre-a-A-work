#!/usr/bin/perl -w

	$| = 1;

	my $smtp = 'smtp.mail.ru';
	my $dns = '89.107.104.30';

	print "Content-type: text/plain; charset=windows-1251\n\n" if $ENV{HTTP_USER_AGENT};

	print "System info\n";
	print "-----------\n\n";
	print "$^O";
	print "\n", `uname -a` if $^O !~ /win/i;
	print "\n\n";

	print "Perl modules\n";
	print "------------\n\n";
	print "strict .......................... ";
	unless (eval ("use strict; return 1;")) { print "Error"; } else { print "Ok"; }
	print "\nSys::Hostname ................... ";
	unless (eval ("use Sys::Hostname; return 1;")) { print "Error"; } else { print "Ok"; }
	print "\nPOSIX ........................... ";
	unless (eval ("use POSIX qw(setsid); return 1;")) { print "Error"; } else { print "Ok"; }
	print "\nErrno ........................... ";
	unless (eval ("use Errno qw(EINPROGRESS); return 1;")) { print "Error"; } else { print "Ok"; }
	print "\nIO::Socket ...................... ";
	unless (eval ("use IO::Socket qw(:DEFAULT :crlf); return 1;")) { print "Error"; } else { use IO::Socket qw(:DEFAULT :crlf); print "Ok"; }
	print "\nIO::Select ...................... ";
	unless (eval ("use IO::Select; return 1;")) { print "Error"; } else { print "Ok"; }
	print "\n\n";

	print "Local server test\n";
	print "-----------\n\n";
	my $s = IO::Socket::INET->new(Proto => "tcp", LocalPort => 36000, Listen => SOMAXCONN, Reuse => 1);
	unless ($s) { print "Error"; } else { close $s; print "Ok"; }
	print "\n\n";

	print "DNS <TCP> client test ($dns)\n";
	print "-----------\n\n";
	my ($r) = ((gethostbyname $dns)[4]);
	unless ($r) { print "Error > Can't resolve DNS hostname"; exit; }
	$s = IO::Socket::INET->new(Proto => "tcp", Type => SOCK_STREAM);
	unless ($s) { print "Error > Can't create socket > $!"; exit; }
	$r = sockaddr_in(53, $r);
	unless ($s->connect($r)) { close $s; print "Error > Can't connect > $!"; exit; }
	close $s; print "Ok";
	print "\n\n";

	print "DNS <UDP> client test ($dns)\n";
	print "-----------\n\n";
	$s = IO::Socket::INET->new(Proto=>'udp');
	unless ($s) { print "Error > Can't create socket > $!"; exit; }
	my $b = pack ('nSn4', (int rand 65535), 0x1, 0x1, 0x0, 0x0, 0x0);
	foreach (split (/\./, "mxs.mail.ru")) { $b .= pack ('C', length ($_)) . $_; }
	$b .= pack ('Cn2', 0x0, 0xF, 0x1);
	$s->send($b, 0, $r);
	$b = "";
	my $t = IO::Select->new($s);
	if ($t->can_read(5)) { $s->recv($b, 512); } else { close $s; print "Error > Timeout"; exit; }
	close $s; print "Ok";
	print "\n\n";

	print "SMTP Client test ($smtp)\n";
	print "-----------\n\n";
	$r = (gethostbyname $smtp)[4];
	unless ($r) { print "Error > Can't resolve SMTP hostname"; exit; }
	$s = IO::Socket::INET->new(Proto => "tcp", Type => SOCK_STREAM);
	unless ($s) { print "Error > Can't create socket > $!"; exit; }
	$r = sockaddr_in(25, $r);
	unless ($s->connect($r)) { close $s; print "Error > Can't connect > $!"; exit; }
	$r = <$s>; close $s;
	if (length $r) { print "Ok\n$r"; } else { print "Error > Can't read response"; }
