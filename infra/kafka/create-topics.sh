set -eu
/opt/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --create --if-not-exists --topic identity.account-created --partitions 1 --replication-factor 1 >/dev/null
/opt/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --create --if-not-exists --topic driver.profile-submitted --partitions 1 --replication-factor 1 >/dev/null
/opt/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --create --if-not-exists --topic driver.verification-changed --partitions 1 --replication-factor 1 >/dev/null
/opt/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --create --if-not-exists --topic driver.availability-changed --partitions 1 --replication-factor 1 >/dev/null
/opt/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --create --if-not-exists --topic booking.created --partitions 1 --replication-factor 1 >/dev/null
/opt/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --create --if-not-exists --topic assignment.offered --partitions 1 --replication-factor 1 >/dev/null
/opt/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --create --if-not-exists --topic assignment.responded --partitions 1 --replication-factor 1 >/dev/null
/opt/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --create --if-not-exists --topic booking.driver-assigned --partitions 1 --replication-factor 1 >/dev/null
/opt/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --create --if-not-exists --topic booking.no-driver-available --partitions 1 --replication-factor 1 >/dev/null
/opt/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --create --if-not-exists --topic booking.cancelled --partitions 1 --replication-factor 1 >/dev/null
/opt/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --create --if-not-exists --topic trip.status-changed --partitions 1 --replication-factor 1 >/dev/null
/opt/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --create --if-not-exists --topic trip.completed --partitions 1 --replication-factor 1 >/dev/null
/opt/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --create --if-not-exists --topic payment.status-changed --partitions 1 --replication-factor 1 >/dev/null
/opt/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --create --if-not-exists --topic rating.submitted --partitions 1 --replication-factor 1 >/dev/null
