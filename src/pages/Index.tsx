import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Game {
  id: number;
  title: string;
  price: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  genre: string;
  isNew?: boolean;
  isPopular?: boolean;
}

interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

const games: Game[] = [
  {
    id: 1,
    title: 'Cyber Strike 2077',
    price: 1999,
    discount: 30,
    rating: 4.8,
    reviews: 12543,
    image: 'https://cdn.poehali.dev/projects/a37c6929-05d1-4fc8-b9e3-cad1e7267d16/files/e1e0539b-9bb3-466c-82fb-3e2f717cbc84.jpg',
    genre: 'Экшен',
    isNew: true,
    isPopular: true
  },
  {
    id: 2,
    title: 'Dark Fantasy Realms',
    price: 2499,
    discount: 50,
    rating: 4.9,
    reviews: 8921,
    image: 'https://cdn.poehali.dev/projects/a37c6929-05d1-4fc8-b9e3-cad1e7267d16/files/63345cef-3eba-4d33-a8d8-cf47f3eaa21a.jpg',
    genre: 'RPG',
    isPopular: true
  },
  {
    id: 3,
    title: 'Space Wars Online',
    price: 1499,
    rating: 4.7,
    reviews: 15632,
    image: 'https://cdn.poehali.dev/projects/a37c6929-05d1-4fc8-b9e3-cad1e7267d16/files/8c879f6b-0285-45c8-9adf-b8cc5f40767b.jpg',
    genre: 'Шутер',
    isNew: true
  },
  {
    id: 4,
    title: 'Neon Racer',
    price: 899,
    discount: 20,
    rating: 4.6,
    reviews: 5421,
    image: 'https://cdn.poehali.dev/projects/a37c6929-05d1-4fc8-b9e3-cad1e7267d16/files/e1e0539b-9bb3-466c-82fb-3e2f717cbc84.jpg',
    genre: 'Гонки',
    isPopular: true
  },
  {
    id: 5,
    title: 'Mythic Legends',
    price: 1799,
    rating: 4.5,
    reviews: 9876,
    image: 'https://cdn.poehali.dev/projects/a37c6929-05d1-4fc8-b9e3-cad1e7267d16/files/63345cef-3eba-4d33-a8d8-cf47f3eaa21a.jpg',
    genre: 'Стратегия',
    isNew: true
  },
  {
    id: 6,
    title: 'Quantum Break',
    price: 2199,
    discount: 40,
    rating: 4.8,
    reviews: 7654,
    image: 'https://cdn.poehali.dev/projects/a37c6929-05d1-4fc8-b9e3-cad1e7267d16/files/8c879f6b-0285-45c8-9adf-b8cc5f40767b.jpg',
    genre: 'Приключения',
    isPopular: true
  }
];

const reviews: Review[] = [
  {
    id: 1,
    author: 'ProGamer2024',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProGamer2024',
    rating: 5,
    text: 'Невероятная игра! Графика на высоте, геймплей захватывающий. Прошёл все миссии за неделю и не пожалел ни минуты!',
    date: '2024-11-10'
  },
  {
    id: 2,
    author: 'GameMaster',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GameMaster',
    rating: 4,
    text: 'Отличный магазин, ключи приходят моментально. Цены ниже чем в Steam. Рекомендую!',
    date: '2024-11-08'
  },
  {
    id: 3,
    author: 'CyberNinja',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CyberNinja',
    rating: 5,
    text: 'Купил уже 10+ игр здесь. Всё работает отлично, поддержка оперативная. Лучший магазин игр!',
    date: '2024-11-05'
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filterGames = (filter: string) => {
    switch (filter) {
      case 'new':
        return games.filter(g => g.isNew);
      case 'sale':
        return games.filter(g => g.discount);
      case 'popular':
        return games.filter(g => g.isPopular);
      default:
        return games;
    }
  };

  const calculateFinalPrice = (price: number, discount?: number) => {
    if (!discount) return price;
    return Math.round(price * (1 - discount / 100));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name={i < Math.floor(rating) ? 'Star' : 'Star'}
        size={16}
        className={i < Math.floor(rating) ? 'fill-accent text-accent' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-primary/20 sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-orbitron font-bold neon-glow">CYBER GAMES</h1>
            <nav className="hidden md:flex gap-6">
              <a href="#catalog" className="text-sm hover:text-primary transition-colors">Каталог</a>
              <a href="#new" className="text-sm hover:text-primary transition-colors">Новинки</a>
              <a href="#sale" className="text-sm hover:text-primary transition-colors">Акции</a>
              <a href="#faq" className="text-sm hover:text-primary transition-colors">FAQ</a>
              <a href="#reviews" className="text-sm hover:text-primary transition-colors">Отзывы</a>
              <a href="#contact" className="text-sm hover:text-primary transition-colors">Контакты</a>
            </nav>
            <Button className="neon-border">
              <Icon name="ShoppingCart" size={20} className="mr-2" />
              Корзина
            </Button>
          </div>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20 animate-neon-pulse"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h2 className="text-5xl md:text-7xl font-orbitron font-black mb-6 neon-glow">
              ИГРОВАЯ ВСЕЛЕННАЯ
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Лицензионные ключи для PC, PlayStation, Xbox и Nintendo Switch
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="neon-border text-lg">
                <Icon name="Gamepad2" size={24} className="mr-2" />
                Каталог игр
              </Button>
              <Button size="lg" variant="outline" className="text-lg border-primary/50 hover:bg-primary/10">
                <Icon name="Zap" size={24} className="mr-2" />
                Горячие скидки
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-orbitron font-bold mb-8 text-center">Каталог игр</h2>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12">
              <TabsTrigger value="all" className="font-orbitron">
                <Icon name="Grid3x3" size={18} className="mr-2" />
                Все игры
              </TabsTrigger>
              <TabsTrigger value="new" className="font-orbitron">
                <Icon name="Sparkles" size={18} className="mr-2" />
                Новинки
              </TabsTrigger>
              <TabsTrigger value="sale" className="font-orbitron">
                <Icon name="Percent" size={18} className="mr-2" />
                Скидки
              </TabsTrigger>
              <TabsTrigger value="popular" className="font-orbitron">
                <Icon name="TrendingUp" size={18} className="mr-2" />
                Популярное
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterGames(activeTab).map((game, index) => (
                  <Card key={game.id} className="cyber-card group animate-fade-in hover:scale-105 transition-transform duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={game.image}
                          alt={game.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {game.discount && (
                          <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground text-lg px-3 py-1">
                            -{game.discount}%
                          </Badge>
                        )}
                        {game.isNew && (
                          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                            NEW
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="border-primary/50">{game.genre}</Badge>
                      </div>
                      <CardTitle className="font-orbitron text-xl mb-3">{game.title}</CardTitle>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex">{renderStars(game.rating)}</div>
                        <span className="text-sm text-muted-foreground">
                          {game.rating} ({game.reviews.toLocaleString()})
                        </span>
                      </div>
                      <CardDescription className="text-sm">
                        Моментальная доставка ключа на email
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 flex items-center justify-between">
                      <div className="flex flex-col">
                        {game.discount ? (
                          <>
                            <span className="text-sm text-muted-foreground line-through">
                              {game.price} ₽
                            </span>
                            <span className="text-2xl font-bold text-accent">
                              {calculateFinalPrice(game.price, game.discount)} ₽
                            </span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold">{game.price} ₽</span>
                        )}
                      </div>
                      <Button className="neon-border">
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        Купить
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="reviews" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-orbitron font-bold mb-12 text-center">Отзывы покупателей</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <Card key={review.id} className="cyber-card animate-fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-3">
                    <Avatar>
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback>{review.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-base">{review.author}</CardTitle>
                      <CardDescription className="text-xs">{review.date}</CardDescription>
                    </div>
                  </div>
                  <div className="flex">{renderStars(review.rating)}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-orbitron font-bold mb-12 text-center">Часто задаваемые вопросы</h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            <AccordionItem value="item-1" className="border-primary/20">
              <AccordionTrigger className="font-orbitron text-left hover:text-primary">
                Как быстро я получу ключ после покупки?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Ключи доставляются моментально на указанный при покупке email. В редких случаях доставка может занять до 5 минут.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-primary/20">
              <AccordionTrigger className="font-orbitron text-left hover:text-primary">
                Это официальные лицензионные ключи?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да, мы работаем только с официальными дистрибьюторами. Все ключи лицензионные и активируются без проблем.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-primary/20">
              <AccordionTrigger className="font-orbitron text-left hover:text-primary">
                Какие способы оплаты вы принимаете?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Мы принимаем банковские карты, электронные кошельки, криптовалюту и мобильные платежи.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-primary/20">
              <AccordionTrigger className="font-orbitron text-left hover:text-primary">
                Что делать, если ключ не активируется?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Свяжитесь с нашей службой поддержки через форму обратной связи. Мы решим проблему в течение 24 часов или вернём деньги.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-primary/20">
              <AccordionTrigger className="font-orbitron text-left hover:text-primary">
                Есть ли у вас программа лояльности?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да! За каждую покупку вы получаете бонусные баллы, которые можно использовать для скидок на следующие покупки.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-orbitron font-bold mb-6">Остались вопросы?</h2>
            <p className="text-muted-foreground mb-8">
              Наша команда поддержки работает 24/7 и готова помочь вам в любое время
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="neon-border">
                <Icon name="Mail" size={20} className="mr-2" />
                support@cybergames.ru
              </Button>
              <Button size="lg" variant="outline" className="border-primary/50">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Онлайн чат
              </Button>
              <Button size="lg" variant="outline" className="border-primary/50">
                <Icon name="Send" size={20} className="mr-2" />
                Telegram
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-primary/20 py-8 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Cyber Games. Все права защищены.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Youtube" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
