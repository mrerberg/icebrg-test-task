import { Empty, List, Spin, Typography } from "antd";
import { SearchData } from "../../../api/search";

import styles from "./index.module.css";

type Props = {
  loading: boolean;
  data?: SearchData;
};

export const SuggestList: React.FC<Props> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className={styles.wrapper}>
        <Spin />
      </div>
    );
  }

  if (!data || !Object.values(data).some(Boolean)) {
    return (
      <div className={styles.wrapper}>
        <Empty />
      </div>
    );
  }

  const { continents, countries, languages } = data;

  // NOTE: Я не уверен, что стоило выводить (все или частично), поэтому ограничился кусочком информации
  return (
    <div>
      {continents && (
        <List
          className={styles.list}
          header={<Typography.Text strong={true}>Континенты</Typography.Text>}
        >
          {continents.map((continent) => (
            <List.Item key={continent.code}>
              {continent.name} ({continent.code})
            </List.Item>
          ))}
        </List>
      )}

      {countries && (
        <List
          className={styles.list}
          header={<Typography.Text strong={true}>Страны</Typography.Text>}
        >
          {countries.map((country) => (
            <List.Item key={country.code}>
              {country.name} ({country.code})
            </List.Item>
          ))}
        </List>
      )}

      {languages && (
        <List
          className={styles.list}
          header={<Typography.Text strong={true}>Языки</Typography.Text>}
        >
          {languages.map((language) => (
            <List.Item key={language.code}>
              {language.name} ({language.code})
            </List.Item>
          ))}
        </List>
      )}
    </div>
  );
};
