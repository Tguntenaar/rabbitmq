import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { EdgeModule } from './edge/edge.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [EdgeModule],
      typePaths: ['./**/*.graphql'],
    }),
    EdgeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
