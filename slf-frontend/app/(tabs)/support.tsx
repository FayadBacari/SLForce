// Import of the different libraries
import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import of the different layout
import { SwipeBackLayout } from '../../components/SwipeBackLayout';

// Import CSS styles
import styles from '../../styles/support';


interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const HelpSupport: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [supportMessage, setSupportMessage] = useState<string>('');

  const faqData: FAQ[] = [
    {
      id: 2,
      category: 'Compte',
      question: 'Mot de passe oublié ?',
      answer: 'Sur la connexion, clique sur "Mot de passe oublié" et suis les instructions.',
    },
    {
      id: 3,
      category: 'Paiements',
      question: 'Comment payer mon coach ?',
      answer: 'Dans la conversation, clique sur "Payer" et choisis ton abonnement via PayPal.',
    },
    {
      id: 4,
      category: 'Paiements',
      question: 'Les paiements sont-ils sécurisés ?',
      answer:
        'Oui ! Tous les paiements passent par PayPal. Nous ne stockons pas tes infos bancaires.',
    },
    {
      id: 5,
      category: 'Fonctionnalités',
      question: 'Comment suivre mes performances ?',
      answer:
        'Va sur la page Athlète pour voir toutes tes stats : dips, tractions, squats, muscle-ups.',
    },
  ];

  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <SwipeBackLayout>
      <SafeAreaView style={styles.payments__chibrax}>
        <ScrollView
          contentContainerStyle={styles['help__scroll-content']}
          showsVerticalScrollIndicator={false}
        >
          {/* Search Bar */}
          <View style={styles['help__search-section']}>
            <View style={styles['help__search-wrapper']}>
              <Text style={styles['help__search-icon']}>🔍</Text>
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Rechercher..."
                placeholderTextColor="#9CA3AF"
                style={styles['help__search-input']}
              />
            </View>
          </View>

          {/* Quick Contact Cards */}
          <View style={styles['help__quick-contact']}>
            <TouchableOpacity style={styles['help__contact-card']}>
              <View style={styles['help__contact-icon-wrapper']}>
                <Text style={styles['help__contact-icon']}>💬</Text>
              </View>
              <View style={styles['help__contact-info']}>
                <Text style={styles['help__contact-title']}>Chat en direct</Text>
                <Text style={styles['help__contact-subtitle']}>Réponse instantanée</Text>
              </View>
              <Text style={styles['help__chevron']}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles['help__contact-card']}>
              <View style={styles['help__contact-icon-wrapper']}>
                <Text style={styles['help__contact-icon']}>📧</Text>
              </View>
              <View style={styles['help__contact-info']}>
                <Text style={styles['help__contact-title']}>Email</Text>
                <Text style={styles['help__contact-subtitle']}>support@bearlift.com</Text>
              </View>
              <Text style={styles['help__chevron']}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles['help__contact-card']}>
              <View style={styles['help__contact-icon-wrapper']}>
                <Text style={styles['help__contact-icon']}>📞</Text>
              </View>
              <View style={styles['help__contact-info']}>
                <Text style={styles['help__contact-title']}>Téléphone</Text>
                <Text style={styles['help__contact-subtitle']}>Lun-Ven 9h-18h</Text>
              </View>
              <Text style={styles['help__chevron']}>›</Text>
            </TouchableOpacity>
          </View>

          {/* FAQ Section Header */}
          <View style={styles['help__section-header']}>
            <Text style={styles['help__section-title']}>QUESTIONS FRÉQUENTES</Text>
          </View>

          {/* FAQ List */}
          <View style={styles['help__faq-list']}>
            {filteredFaqs.map((faq) => (
              <View key={faq.id}>
                <TouchableOpacity
                  onPress={() => toggleFaq(faq.id)}
                  style={[
                    styles['help__faq-item'],
                    expandedFaq === faq.id && styles['help__faq-item--expanded'],
                  ]}
                >
                  <View style={styles['help__faq-question-wrapper']}>
                    <Text style={styles['help__faq-question']}>{faq.question}</Text>
                    <Text style={styles['help__faq-toggle']}>
                      {expandedFaq === faq.id ? '−' : '+'}
                    </Text>
                  </View>
                </TouchableOpacity>

                {expandedFaq === faq.id && (
                  <View style={styles['help__faq-answer-wrapper']}>
                    <Text style={styles['help__faq-answer']}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Contact Form Section */}
          <View style={styles['help__section-header']}>
            <Text style={styles['help__section-title']}>BESOIN D'AIDE ?</Text>
          </View>

          <View style={styles['help__form-card']}>
            <View style={styles['help__form-header']}>
              <View style={styles['help__form-icon-wrapper']}>
                <Text style={styles['help__form-icon']}>✉️</Text>
              </View>
              <View style={styles['help__form-info']}>
                <Text style={styles['help__form-title']}>Envoie-nous un message</Text>
                <Text style={styles['help__form-subtitle']}>On répond en moins de 2h</Text>
              </View>
            </View>

            <TextInput
              value={supportMessage}
              onChangeText={setSupportMessage}
              placeholder="Décris ton problème..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              style={styles['help__form-textarea']}
            />

            <TouchableOpacity style={styles['help__form-submit']}>
              <Text style={styles['help__form-submit-text']}>Envoyer</Text>
            </TouchableOpacity>
          </View>

          {/* Info Box */}
          <View style={styles['help__info-box']}>
            <Text style={styles['help__info-icon']}>💡</Text>
            <View style={styles['help__info-content']}>
              <Text style={styles['help__info-title']}>Notre engagement</Text>
              <Text style={styles['help__info-text']}>
                On s'engage à répondre à toutes tes questions dans les 24h. La satisfaction de notre
                communauté est notre priorité !
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SwipeBackLayout>
  );
};

export default HelpSupport;
